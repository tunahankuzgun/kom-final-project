# omron_mx2.py

from . import Inverter, PIDController
from umodbus.client.serial import rtu
import serial
import serial.rs485

DEVICE_ADDRESS = 1

# Register Adresleri
REG_OPERATION_COMMAND = 0x0001
REG_ROTATION_DIRECTION = 0x0002
REG_EXTERNAL_TRIP = 0x0003
REG_TRIP_RESET = 0x0004
# ... (Diğer register adresleriyle devam edin)

class OmronMX2(Inverter):

    def __init__(self, pid_controller=None):
        super().__init__()
        self.pid_controller = pid_controller

    def connect(self, port):
        self.serial = serial.rs485.RS485(
            port=port,
            baudrate=9600,
            parity=serial.PARITY_EVEN,
            stopbits=1,
            bytesize=8,
            timeout=1,
        )

    def is_running(self):
        # İşletme komutunu oku
        message = rtu.read_holding_registers(
            DEVICE_ADDRESS, REG_OPERATION_COMMAND, 1)
        (response,) = rtu.send_message(message, self.serial)
        return bool(response & 0x1)

    def get_operating_condition(self):
        # Dönme yönünü oku
        message = rtu.read_holding_registers(
            DEVICE_ADDRESS, REG_ROTATION_DIRECTION, 1)
        (response,) = rtu.send_message(message, self.serial)
        return response * 0.01  # Hz

    def start(self, control_input):
        if self.pid_controller:
            # PID kontrolörünü kullanarak kontrol girişini hesapla
            control_input = self.pid_controller.calculate_output(
                control_input, self.get_operating_condition())
        # İşletme komutunu başlat
        message = rtu.write_single_register(
            DEVICE_ADDRESS, REG_OPERATION_COMMAND, 0b1)
        response = rtu.send_message(message, self.serial)
        return response

    def stop(self):
        # İşletme komutunu durdur
        message = rtu.write_single_register(
            DEVICE_ADDRESS, REG_OPERATION_COMMAND, 0b0)
        response = rtu.send_message(message, self.serial)
        return response

    def get_external_trip_status(self):
        # Harici trip durumunu oku
        message = rtu.read_holding_registers(
            DEVICE_ADDRESS, REG_EXTERNAL_TRIP, 1)
        (response,) = rtu.send_message(message, self.serial)
        return bool(response & 0b1)

    def reset_trip(self):
        # Trip reset komutunu gönder
        message = rtu.write_single_register(
            DEVICE_ADDRESS, REG_TRIP_RESET, 0b1)
        response = rtu.send_message(message, self.serial)
        return response
