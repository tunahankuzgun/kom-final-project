# __init__.py

from abc import ABC, abstractmethod


class Inverter(ABC):

    @abstractmethod
    def connect(self, port):
        pass

    @abstractmethod
    def is_running(self):
        pass

    @abstractmethod
    def get_operating_condition(self):
        pass

    @abstractmethod
    def start(self, control_input):
        pass

    @abstractmethod
    def stop(self):
        pass

    def close_connection(self):
        if hasattr(self, 'serial') and self.serial.is_open:
            self.serial.close()


class PIDController:

    def __init__(self, proportional_gain, integral_gain, derivative_gain):
        self.proportional_gain = proportional_gain
        self.integral_gain = integral_gain
        self.derivative_gain = derivative_gain
        self.previous_error = 0
        self.integral = 0

    def calculate_output(self, setpoint, process_variable):
        error = setpoint - process_variable
        self.integral += error
        derivative = error - self.previous_error

        output = (
            self.proportional_gain * error +
            self.integral_gain * self.integral +
            self.derivative_gain * derivative
        )

        self.previous_error = error
        return output
