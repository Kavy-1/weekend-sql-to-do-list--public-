-- Database Name: to-do-app
-- Table Name: to-do

CREATE TABLE "to-do"(
	"id" SERIAL PRIMARY KEY, 
	"task" VARCHAR( 256 ),
	"urgency" VARCHAR( 256 ),
	"status" VARCHAR( 256 )
);

INSERT INTO "to-do"( "task", "urgency", "status" )
VALUES
( 'Laundry', 'Urgent', 'Incomplete' ),
( 'Mowing the Lawn', 'Not Urgent', 'Complete' ),
( 'Vacuum', 'Urgent', 'Incomplete' ),
( 'Landscaping', 'Not Urgent', 'Complete' ),
( 'Cook Diner', 'Urgent', 'Incomplete' ),
( 'Dishwasher', 'Urgent', 'Incomplete' ),
( 'Walk the Dog', 'Urgent', 'Incomplete' );