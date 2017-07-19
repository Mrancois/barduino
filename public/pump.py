#!/usr/bin/python
from RPi import GPIO
import time
import sys

# init GPIO
GPIO.setwarnings(False)
GPIO.setmode(GPIO.BCM)

# init value from args
theAirPump = int(sys.argv[1])
nbSecondToActive = int(sys.argv[2])

print 'theAirPump', theAirPump
print 'nbSecondToActive', nbSecondToActive

print 'Enable air pump'
GPIO.setup(theAirPump, GPIO.OUT)

print 'For', nbSecondToActive, 'secondes'
time.sleep(nbSecondToActive)

print 'Disable air pump'
GPIO.setup(theAirPump, GPIO.IN)
