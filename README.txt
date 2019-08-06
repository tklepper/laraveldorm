Dormitory App

Developed By Tony Klepper

Purpose: 
You work for the University of Southern Virginia Beach as the Dormitory Coordinator. Your job is to place and
manage students living in the dormitories. You are responsible for 2 dormitories. Each dormitory has 16 units.
Four units on each floor. Each unit has four bedrooms with private bathrooms. Each bedroom can house a
maximum 2 people. All units have a common area, kitchen and one additional shared 2/3 bathroom. Each unit is
segregated by sex. In other words, you can't have both guys and girls living in the same unit.
Write a web interface in PHP and MySQL that has the following features:
 - Allows you to enter and store the following information about the student:
 - Name, Home address, Gender, Student ID#, DOB, Phone Number, Dormitory Building Number
 - Displays the floor plans of all dorms in a graphical format.
 - Displays the occupants of a unit by name and student ID when you click on a unit.
 - Allows you to add, delete and update students and student information

File Structure:  
README.txt  - this document
application - Main App, PHP using Laravel Framework
sql  - MySQL Database
www - Frontend Site

Database Details in application > .env

Completed Functions:
Add User: Creates student info, and assigns a room (only puts into room if occupants (if any) are of the same gender)
View all Units by floor, and number of occupants per unit
View occupants by unit
Vew student details by clicking on name

Missing Functions:
Edit User - Available on backend but not frontend
Delete User - Available on backend but not frontend
List User Table - Available on backend, but not frontend
API not secured yet

