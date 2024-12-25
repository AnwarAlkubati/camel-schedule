let appointments = [];
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyANnSVhziTOyIeMdm2yLmCKUew-r7LY-p0",
  authDomain: "entaj-project.firebaseapp.com",
  projectId: "entaj-project",
  storageBucket: "entaj-project.firebasestorage.app",
  messagingSenderId: "45040192625",
  appId: "1:45040192625:web:e418f8a8b23840e6709fd0",
  measurementId: "G-2YRK1BP26D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// انسخ إعدادات Firebase الخاصة بمشروعك هنا.// استبدل القسم التالي بالكود الذي تحصل عليه من Firebase Console:
// مثال:
// const firebaseConfig = {//     apiKey: "YOUR_API_KEY",
//     authDomain: "YOUR_PROJECT_ID.firebaseapp.com",//     databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
//     projectId: "YOUR_PROJECT_ID",//     storageBucket: "YOUR_PROJECT_ID.appspot.com",
//     messagingSenderId: "YOUR_SENDER_ID",//     appId: "YOUR_APP_ID"
// };// const app = firebase.initializeApp(firebaseConfig);
// const database = firebase.database();
// استمع لحدث إرسال النموذج
document.getElementById('booking-form').addEventListener('submit', function(event) {    event.preventDefault(); // منع الإرسال التلقائي للنموذج
    // جمع البيانات من الحقول
    const name = document.getElementById('name').value;    const camelType = document.getElementById('camel-type').value;
    const appointmentDate = document.getElementById('appointment-date').value;    const time = document.getElementById('time').value;
    const maleCamel = document.getElementById('camel-male').value;
    // إنشاء كائن بيانات جديد    const newAppointment = { name, camelType, appointmentDate, time, maleCamel };
    // حفظ البيانات في المصفوفة المحلية
    appointments.push(newAppointment);
    // حفظ البيانات في Firebase    const newAppointmentRef = database.ref('appointments').push();
    newAppointmentRef.set(newAppointment);
    // عرض رسالة تأكيد للمستخدم    alert(`تم تحديد موعد للتلقيح!\n\nصاحب الإبل: ${name}\nنوع الإبل: ${camelType}\nالتاريخ: ${appointmentDate}\nالوقت: ${time}\nالذكر: ${maleCamel}`);
    // تحديث قائمة المواعيد المعروضة
    displayAppointments();
});
// دالة لعرض المواعيدfunction displayAppointments() {
    const appointmentsList = document.getElementById('appointments-list');    appointmentsList.innerHTML = ''; // مسح القائمة الحالية
    // استرجاع المواعيد من Firebase
    database.ref('appointments').on('value', (snapshot) => {        snapshot.forEach((childSnapshot) => {
            const appointment = childSnapshot.val();            const listItem = document.createElement('li');
            listItem.textContent = صاحب `الإبل: ${appointment.name} - نوع الإبل: ${appointment.camelType} - التاريخ: ${appointment.appointmentDate} - الوقت: ${appointment.time} - الذكر: ${appointment.maleCamel}`;            appointmentsList.appendChild(listItem);
        });    });
