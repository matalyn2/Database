create table kitten(
	id int auto_increment primary key,
	name varchar(255),
	age int,
	history varchar(255),
	fertility boolean,
	adpoted boolean,
	photos varchar(255)
);

create table owner(
	id int auto_increment primary key,
	name varchar(255),
	email varchar(255),
	address varchar(255),
	phone varchar(255)
);

create table shelter(
	id int auto_increment primary key,
	name varchar(255),
	email varchar(255),
	address varchar(255),
	phone varchar(255)
);

create table staff(
	id int auto_increment primary key,
	name varchar(255),
	email varchar(255),
	address varchar(255),
	phone varchar(255)
);

create table adoption(
	kitten_id int,
	owner_id int,
	aDate date primary key,
	contract varchar(255)
);

create table personality(
	kitten_id int auto_increment primary key,
	affection varchar(255),
	CONSTRAINT chk_affection CHECK (affection IN ('very', 'independent', 'occasional')),
	activity varchar(255),
	CONSTRAINT chk_activity CHECK (activity IN ('Very Active', 'Not Active', 'Occasional')) 
);

create table actions(
	kitten_id int,
	personality_id int
);

create table shots(
	name varchar(255) primary key,
	next_scheduled date
);

create table medical(
	kitten_id int,
	shot_name varchar(255),
	mDate date
);

create table rental(
	id int auto_increment primary key,
	duration varchar(255),
	CONSTRAINT chk_duration CHECK (duration IN ('Week', 'Days', 'Two Weeks')), 
	participating boolean
);

create table availability(
	kitten_id int,
	rental_id int
);

create table environment(
	id int auto_increment primary key,
	in_outdoor varchar(255),
	CONSTRAINT chk_env CHECK (in_outdoor IN ('Outdoor', 'Indoor', 'Both')),
	family_size varchar(255),
	CONSTRAINT chk_size CHECK (family_size IN ('Small', 'Medium', 'Large')),
	noise varchar(255),
	CONSTRAINT chk_noise CHECK (noise IN ('Minimal', 'Plenty', 'Occasional')) 
);

create table preference(
	kitten_id int,
	env_id int
);

create table breed(
	type varchar(255) primary key,
	purebred boolean
);

create table classification(
	kitten_id int,
	breed_type varchar(255)
);

create table online_user(
	username varchar(255) primary key,
	password varchar(255)
);

create table owner_identity(
	username varchar(255),
	owner_id int
);

create table shelter_identity(
	username varchar(255),
	shelter_id int
);

create table staff_identity(
	username varchar(255),
	staff_id int
);

create table role(
	id int auto_increment primary key,
	position varchar(255),
	permission varchar(255),
	CONSTRAINT chk_permission CHECK (permission IN ('Admin', 'Staff', 'Owner', 'Shelter'))
);

create table assinment(
	role_id int,
	username varchar(255)
);
