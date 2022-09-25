const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const loggerMorgan = require('morgan');
const cors = require('cors');

const CONSTANT = require('./lib/constant.js');
const logger = require('./lib/logger');
const Database = require('./lib/models/index');

const indexRouter = require('./routes/index');

const adminRouter = require('./modules/admin/routes/admin.routes');
const adminCategoryRouter = require('./modules/admin/routes/admin-category.routes');
const adminPatientRouter = require('./modules/admin/routes/admin-patient.routes');
const adminDoctorRouter = require('./modules/admin/routes/admin-doctor.routes');
const adminAppointmentRouter = require('./modules/admin/routes/admin-appointment.routes');
const adminPharmacyRouter = require('./modules/admin/routes/admin-pharmacy.routes');
const adminAvailabilityRouter = require('./modules/admin/routes/admin-availability.routes');

const userRouter = require('./modules/user/routes/user.routes');
const userPatientRouter = require('./modules/user/routes/user-patient.routes');
const userDoctorRouter = require('./modules/user/routes/user-doctor.routes');
const userPharmacyRouter = require('./modules/user/routes/user-pharmacy.routes');

const availabilityRouter = require('./modules/availability/routes/availability.routes');
const appointmentRouter = require('./modules/appointment/routes/appointment.routes');
const testOrderRouter = require('./modules/appointment/routes/test-order.routes');
const medicalCertificateOrderRouter = require('./modules/appointment/routes/medical-certificate.routes');
const referralRouter = require('./modules/appointment/routes/referral.routes');
const prescriptionRouter = require('./modules/appointment/routes/prescription.routes');
const pharmacyOrderRouter = require('./modules/pharmacy-order/routes/pharmacy-order.routes');
const favouriteRouter = require('./modules/favourite/routes/favourite.routes');

const notificationRouter = require('./modules/notification/routes/notification.routes');
const paymentRouter = require('./modules/payments/routes/payment.routes');

const BASE_PATH = CONSTANT.API.BASE_PATH;

const app = express();

(async () => {
  try {
    await Database.initialize();
    logger.log(CONSTANT.LOGGER.INFO, 'Database connected');
  } catch (err) {
    logger.log(CONSTANT.LOGGER.ERROR, err);
  }
})();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(loggerMorgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.use(`${BASE_PATH}`, indexRouter);

app.use(`${BASE_PATH}/admin`, adminRouter);
app.use(`${BASE_PATH}/admin/category`, adminCategoryRouter);
app.use(`${BASE_PATH}/admin/patient`, adminPatientRouter);
app.use(`${BASE_PATH}/admin/doctor`, adminDoctorRouter);
app.use(`${BASE_PATH}/admin/appointment`, adminAppointmentRouter);
app.use(`${BASE_PATH}/admin/pharmacy`, adminPharmacyRouter);
app.use(`${BASE_PATH}/admin/availability`, adminAvailabilityRouter);

app.use(`${BASE_PATH}/user`, userRouter);
app.use(`${BASE_PATH}/user/patient`, userPatientRouter);
app.use(`${BASE_PATH}/user/doctor`, userDoctorRouter);
app.use(`${BASE_PATH}/user/pharmacy`, userPharmacyRouter);

app.use(`${BASE_PATH}/availability`, availabilityRouter);
app.use(`${BASE_PATH}/appointment`, appointmentRouter);
app.use(`${BASE_PATH}/test-order`, testOrderRouter);
app.use(`${BASE_PATH}/medical-certificate`, medicalCertificateOrderRouter);
app.use(`${BASE_PATH}/referral`, referralRouter);
app.use(`${BASE_PATH}/prescription`, prescriptionRouter);
app.use(`${BASE_PATH}/pharmacy-order`, pharmacyOrderRouter);
app.use(`${BASE_PATH}/notification`, notificationRouter);
app.use(`${BASE_PATH}/payment`, paymentRouter);

app.use(`${BASE_PATH}/favourite`, favouriteRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
