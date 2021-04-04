#!/usr/bin/env python

#https://github.com/AlgoSolu/DS18B20_YF-S201_RaspberryPi/tree/master/YF-S201

import time, sys
import RPi.GPIO as GPIO
from datetime import datetime

import logging
import threading
import time

from serial import Serial
import json

def read_flowmeter():
    print("READ FLOWMETER")
    global total_liters_period
    secondes = 0
    
    pin_input = 8
    sample_rate = 5     # Sampling each 5 secondes
    time_start = 0
    time_end = 0
    period = 0;
    hz = []             # Frequency !important!
    m = 0.0021          # See linear.pdf (coefficient in order to get a linear function)
    
    db_good_sample = 0
    db_hz = 0
    db_liter_by_min = 0
    
    continueThread = True;
    while continueThread:
        # start / end 
        time_start = time.time()
        time_end = time_start + sample_rate
        hz = []
        sample_total_time = 0
        
        # Edge
        current = GPIO.input(pin_input)
        edge = current # Rising edge / Falling edge

        try:
            while time.time() <= time_end:
                t = time.time();
                v = GPIO.input(pin_input)
                if current != v and current == edge:
                    period = t - time_start # Impulsion period
                    new_hz = 1/period
                    hz.append(new_hz)               # Period = 1/period
                    sample_total_time += t - time_start
                    time_start = t;
                current = v;
            
            secondes += sample_rate
            nb_samples = len(hz);
            if nb_samples >0:
                average = sum(hz) / float(len(hz));
                good_sample = sample_total_time/sample_rate
                db_good_sample = round(good_sample*100,4)
                average = average * good_sample
            else:
                average = 0
                
            total_liters_period += average*m*sample_rate
            
            # print("\t", db_hz,'(hz) average')
            # print('\t', db_liter_by_min,'(L/min)') # Display L/min instead of L/sec
            # print(round(total_liters_period,4),'(L) total')
            # print(round(secondes/60,4), '(min) total')
            # print('-------------------------------------')
        except KeyboardInterrupt:
            print('\n CTRL+C - Exiting')
            continueThread = False;
            GPIO.cleanup()
    
    
def readPressure(ser):
    ser.flushInput()
    ser.flushOutput()
    
    ser.write(bytes(b'a'))
    s = str(ser.read(11))
    nb = s.split('|');
    print(s);
    ret = {
        "C1" : float(nb[0]),
        "C2" : float(nb[1])
    }
    return (ret)


def writeDB(C1, C2, L):
    print(C1, C2, L)

def secondThread():
    return 1
    
    

if __name__ == "__main__":
    global total_liters_period
    total_liters_period = 0
    
    pin_input = 8
    GPIO.setmode(GPIO.BOARD)
    GPIO.setup(pin_input, GPIO.IN)
    
    
    ser = Serial('/dev/ttyACM4')
    print(ser.name)
    time.sleep(2);
    
    x1 = threading.Thread(target=read_flowmeter)
    x1.start() 
    
    continueThread = True
    while continueThread:
        try:
            pressure = readPressure(ser)
            tmpLiter = total_liters_period
            total_liters_period = 0
            writeDB(float(pressure["C1"]), float(pressure["C2"]), tmpLiter)
            
            time.sleep(10)
        except KeyboardInterrupt:
            print('\n CTRL+C - Exiting')
            continueThread = False;
    ser.close()
    
    GPIO.cleanup()
