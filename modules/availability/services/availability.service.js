'use strict';
const AvailabilityGeneralRepository = require('../repositories/availability-general.repository');
const AvailabilitySpecialRepository = require('../repositories/availability-special.repository');
const { v4: uuid } = require('uuid');
const Utils = require('../../../lib/utils');
const { SPECIAL_AVAILABILITY_TYPES } = require('../../../lib/constant');

class AvailabilityService {
  static async add(doctorId, data) {
    try {
      const consultationTime = data.consultationTime;
      const gapTime = data.gapTime;
      const availabilityGeneralArray = [];
      const availabilitySpecialArray = [];
      for (const item of data.generalHours) {
        const availabilityGeneral = {
          availabilityId: uuid(),
          doctorId,
          consultationTime,
          gapTime,
          dayIndex: item.dayIndex,
          morningStart: item.morningStart ? item.morningStart : null,
          morningEnd: item.morningEnd ? item.morningEnd : null,
          eveningStart: item.eveningStart ? item.eveningStart : null,
          eveningEnd: item.eveningEnd ? item.eveningEnd : null,
          createdBy: doctorId,
          updatedBy: doctorId,
        };
        availabilityGeneralArray.push(availabilityGeneral);
      }
      for (const item of data.specialHours) {
        const availabilitySpecial = {
          availabilityId: uuid(),
          doctorId,
          consultationTime,
          gapTime,
          date: item.date,
          morningType: item.morningType ? item.morningType : null,
          morningStart: item.morningStart ? item.morningStart : null,
          morningEnd: item.morningEnd ? item.morningEnd : null,
          eveningType: item.eveningType ? item.eveningType : null,
          eveningStart: item.eveningStart ? item.eveningStart : null,
          eveningEnd: item.eveningEnd ? item.eveningEnd : null,
          createdBy: doctorId,
          updatedBy: doctorId,
        };
        availabilitySpecialArray.push(availabilitySpecial);
      }
      await AvailabilityGeneralRepository.deleteAllByDoctorId(doctorId);
      await AvailabilityGeneralRepository.create(availabilityGeneralArray);
      await AvailabilitySpecialRepository.deleteAllByDoctorId(doctorId);
      await AvailabilitySpecialRepository.create(availabilitySpecialArray);
      return Promise.resolve(true);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async get(doctorId) {
    try {
      const resultGeneral = await AvailabilityGeneralRepository.getAllByDoctorId(doctorId);
      const resultSpecial = await AvailabilitySpecialRepository.getAllByDoctorId(doctorId);
      const response = {
        consultationTime: resultGeneral[0].consultationTime,
        gapTime: resultGeneral[0].consultationTime,
        generalHours: [],
        specialHours: []
      }
      for (const item of resultGeneral) {
        const obj = {
          dayIndex: item.dayIndex,
          morningStart: item.morningStart ? item.morningStart : null,
          morningEnd: item.morningEnd ? item.morningEnd : null,
          eveningStart: item.eveningStart ? item.eveningStart : null,
          eveningEnd: item.eveningEnd ? item.eveningEnd : null
        }
        response.generalHours.push(obj);
      }
      for (const item of resultSpecial) {
        const obj = {
          date: item.date,
          morningType: item.morningType ? item.morningType : null,
          morningStart: item.morningStart ? item.morningStart : null,
          morningEnd: item.morningEnd ? item.morningEnd : null,
          eveningType: item.eveningType ? item.eveningType : null,
          eveningStart: item.eveningStart ? item.eveningStart : null,
          eveningEnd: item.eveningEnd ? item.eveningEnd : null
        }
        response.specialHours.push(obj);
      }
      return Promise.resolve(response);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static addSlotsForADayMorning(aDay, availability) {
    const slotTime = availability.consultationTime + availability.gapTime;
    if (availability.morningStart && availability.morningEnd) {
      const timePartsStart = availability.morningStart.split(':');
      const timePartsEnd = availability.morningEnd.split(':');
      const startDate = new Date();
      const endDate = new Date();
      startDate.setHours(parseInt(timePartsStart[0]));
      startDate.setMinutes(parseInt(timePartsStart[1]));
      endDate.setHours(parseInt(timePartsEnd[0]));
      endDate.setMinutes(parseInt(timePartsEnd[1]));
      const aMorningSlot = startDate.getHours().toString().padStart(2, '0') + ':' + startDate.getMinutes().toString().padStart(2, '0');
      aDay.morning.push(aMorningSlot);
      while (startDate < endDate) {
        startDate.setMinutes(startDate.getMinutes() + slotTime);
        const aMorningSlot = startDate.getHours().toString().padStart(2, '0') + ':' + startDate.getMinutes().toString().padStart(2, '0');
        aDay.morning.push(aMorningSlot);
      }
      aDay.morning.pop();
    }
    return aDay;
  }

  static addSlotsForADayEvening(aDay, availability) {
    const slotTime = availability.consultationTime + availability.gapTime;
    if (availability.eveningStart && availability.eveningEnd) {
      const timePartsStart = availability.eveningStart.split(':');
      const timePartsEnd = availability.eveningEnd.split(':');
      const startDate = new Date();
      const endDate = new Date();
      startDate.setHours(parseInt(timePartsStart[0]));
      startDate.setMinutes(parseInt(timePartsStart[1]));
      endDate.setHours(parseInt(timePartsEnd[0]));
      endDate.setMinutes(parseInt(timePartsEnd[1]));
      const aEveningSlot = startDate.getHours().toString().padStart(2, '0') + ':' + startDate.getMinutes().toString().padStart(2, '0');
      aDay.evening.push(aEveningSlot);
      while (startDate < endDate) {
        startDate.setMinutes(startDate.getMinutes() + slotTime);
        const aEveningSlot = startDate.getHours().toString().padStart(2, '0') + ':' + startDate.getMinutes().toString().padStart(2, '0');
        aDay.evening.push(aEveningSlot);
      }
      aDay.evening.pop();
    }
    return aDay;
  }

  static removeSlotsForADayMorning(aDay, availability) {
    const slotTime = availability.consultationTime + availability.gapTime;
    if (availability.morningStart && availability.morningEnd) {
      const timePartsStart = availability.morningStart.split(':');
      const timePartsEnd = availability.morningEnd.split(':');
      const startDate = new Date();
      const endDate = new Date();
      startDate.setHours(parseInt(timePartsStart[0]));
      startDate.setMinutes(parseInt(timePartsStart[1]));
      endDate.setHours(parseInt(timePartsEnd[0]));
      endDate.setMinutes(parseInt(timePartsEnd[1]));
      const aMorningSlot = startDate.getHours().toString().padStart(2, '0') + ':' + startDate.getMinutes().toString().padStart(2, '0');
      const index = aDay.morning.indexOf(aMorningSlot);
      if (index !== -1) {
        aDay.morning.splice(index, 1);
      }
      while (startDate < endDate) {
        startDate.setMinutes(startDate.getMinutes() + slotTime);
        const aMorningSlot = startDate.getHours().toString().padStart(2, '0') + ':' + startDate.getMinutes().toString().padStart(2, '0');
        const index = aDay.morning.indexOf(aMorningSlot);
        if (index !== -1) {
          aDay.morning.splice(index, 1);
        }
      }
      const endMorningSlot = endDate.getHours().toString().padStart(2, '0') + ':' + endDate.getMinutes().toString().padStart(2, '0');
      aDay.morning.push(endMorningSlot);
    }
    return aDay;
  }

  static removeSlotsForADayEvening(aDay, availability) {
    const slotTime = availability.consultationTime + availability.gapTime;
    if (availability.eveningStart && availability.eveningEnd) {
      const timePartsStart = availability.eveningStart.split(':');
      const timePartsEnd = availability.eveningEnd.split(':');
      const startDate = new Date();
      const endDate = new Date();
      startDate.setHours(parseInt(timePartsStart[0]));
      startDate.setMinutes(parseInt(timePartsStart[1]));
      endDate.setHours(parseInt(timePartsEnd[0]));
      endDate.setMinutes(parseInt(timePartsEnd[1]));
      const aEveningSlot = startDate.getHours().toString().padStart(2, '0') + ':' + startDate.getMinutes().toString().padStart(2, '0');
      const index = aDay.evening.indexOf(aEveningSlot);
      if (index !== -1) {
        aDay.evening.splice(index, 1);
      }
      while (startDate < endDate) {
        startDate.setMinutes(startDate.getMinutes() + slotTime);
        const aEveningSlot = startDate.getHours().toString().padStart(2, '0') + ':' + startDate.getMinutes().toString().padStart(2, '0');
        const index = aDay.evening.indexOf(aEveningSlot);
        if (index !== -1) {
          aDay.evening.splice(index, 1);
        }
      }
      const endEveningSlot = endDate.getHours().toString().padStart(2, '0') + ':' + endDate.getMinutes().toString().padStart(2, '0');
      aDay.evening.push(endEveningSlot);
    }
    return aDay;
  }

  static async getForComingWeek(doctorId) {
    try {
      const resultGeneral = await AvailabilityGeneralRepository.getAllByDoctorId(doctorId);
      const resultSpecial = await AvailabilitySpecialRepository.getAllByDoctorId(doctorId);
      const response = [];

      for (let i = 0; i < 7; i++) {
        const date = Utils.getDate();
        date.setDate(date.getDate() + i);
        const aDay = {
          date: date.toISOString().split('T')[0],
          morning: [],
          evening: []
        };
        const availability = resultGeneral.find(item => item.dayIndex === date.getDay());
        if (availability) {
          this.addSlotsForADayMorning(aDay, availability);
          this.addSlotsForADayEvening(aDay, availability);
          response.push(aDay);
        }
      }

      for (const availability of resultSpecial) {
        const aDay = response.find(item => item.date === availability.date);
        if (aDay) {
          if (availability.morningType && availability.morningType === SPECIAL_AVAILABILITY_TYPES.INCLUDE) {
            this.addSlotsForADayMorning(aDay, availability);
          }
          if (availability.eveningType && availability.eveningType === SPECIAL_AVAILABILITY_TYPES.INCLUDE) {
            this.addSlotsForADayEvening(aDay, availability);
          }
          if (availability.morningType && availability.morningType === SPECIAL_AVAILABILITY_TYPES.EXCLUDE) {
            this.removeSlotsForADayMorning(aDay, availability);
          }
          if (availability.eveningType && availability.eveningType === SPECIAL_AVAILABILITY_TYPES.EXCLUDE) {
            this.removeSlotsForADayEvening(aDay, availability);
          }
        }
      }

      return Promise.resolve(response);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async getForDate(doctorId, date) {
    try {
      const resultGeneral = await AvailabilityGeneralRepository.getAllByDoctorId(doctorId);
      const resultSpecial = await AvailabilitySpecialRepository.getAllByDoctorId(doctorId);

      const formattedDate = new Date(date);

      const aDay = {
        date,
        morning: [],
        evening: []
      };

      const availabilityGeneral = resultGeneral.find(item => item.dayIndex === formattedDate.getDay());
      if (availabilityGeneral) {
        this.addSlotsForADayMorning(aDay, availabilityGeneral);
        this.addSlotsForADayEvening(aDay, availabilityGeneral);
      }

      const availabilitySpecial = resultSpecial.find(item => item.date === date);
      if (availabilitySpecial) {
        if (availabilitySpecial.morningType && availabilitySpecial.morningType === SPECIAL_AVAILABILITY_TYPES.INCLUDE) {
          this.addSlotsForADayMorning(aDay, availabilitySpecial);
        }
        if (availabilitySpecial.eveningType && availabilitySpecial.eveningType === SPECIAL_AVAILABILITY_TYPES.INCLUDE) {
          this.addSlotsForADayEvening(aDay, availabilitySpecial);
        }
        if (availabilitySpecial.morningType && availabilitySpecial.morningType === SPECIAL_AVAILABILITY_TYPES.EXCLUDE) {
          this.removeSlotsForADayMorning(aDay, availabilitySpecial);
        }
        if (availabilitySpecial.eveningType && availabilitySpecial.eveningType === SPECIAL_AVAILABILITY_TYPES.EXCLUDE) {
          this.removeSlotsForADayEvening(aDay, availabilitySpecial);
        }
      }

      return Promise.resolve(aDay);
    } catch (err) {
      return Promise.reject(err);
    }
  }
}

module.exports = AvailabilityService;
