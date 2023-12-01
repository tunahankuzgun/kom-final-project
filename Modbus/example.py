# example.py

from vfd.omron_mx2 import OmronMX2, PIDController
import time

# Initial PID parameters for torque control tuning
KP = 0.1
KD = 0.01
KI = 0.0  # Start with KI = 0

pid_controller = PIDController(KP, KI, KD)
my_inverter = OmronMX2(pid_controller=pid_controller)

my_inverter.connect("/dev/tty.usbserial-12345678")

print("Inverter Starting")
my_inverter.start(50)  # Set initial torque demand

for _ in range(10):
    print("Running: {}".format(my_inverter.is_running()))
    print("Operating Condition: {}".format(
        my_inverter.get_operating_condition()))
    print()
    time.sleep(1)

print("Inverter Stopping")
my_inverter.stop()

for _ in range(10):
    print("Running: {}".format(my_inverter.is_running()))
    print("Operating Condition: {}".format(
        my_inverter.get_operating_condition()))
    print()
    time.sleep(1)

my_inverter.close_connection()
