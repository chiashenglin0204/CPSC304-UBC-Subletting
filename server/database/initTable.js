var connection = require('../database/sequelize.js');

const initTables = async () => {
	await initUsers();
	await initSubletters();
    await initApplicants();
};

const initUsers = async () => {
	await connection
		.query(
			`
                CREATE TABLE IF NOT EXISTS "users" (
                sid     Serial   PRIMARY KEY,
                "phone#"  TEXT      NOT NULL,
                name    TEXT      NOT NULL,
                gender  CHAR(1)   NOT NULL,
                email   TEXT,
                UNIQUE ("phone#")
                );
            `,
			{ type: connection.QueryTypes.CREATE }
		)
		.then(() => console.log('successfully created users table'))
		.catch(e => console.error(e.stack));
};

const initSubletters = async () => {
	await connection
		.query(
			`
                CREATE TABLE IF NOT EXISTS Subletter (
                subID   Serial,
                sid     Serial,
                PRIMARY KEY (subID, sid),
                FOREIGN KEY (sid) REFERENCES "users" (sid)
                );
            `,
			{ type: connection.QueryTypes.CREATE }
		)
		.then(() => console.log('successfully created Subletters table'))
		.catch(e => console.error(e.stack));
};

const initApplicants = async () => {
	await connection
		.query(
			`
                CREATE TABLE IF NOT EXISTS Applicant (
                applicantID   Serial,
                sid           Serial,
                PRIMARY KEY (applicantID, sid),
                FOREIGN KEY (sid) REFERENCES "users" (sid)
                );
            `,
			{ type: connection.QueryTypes.CREATE }
		)
		.then(() => console.log('successfully created Applicants table'))
		.catch(e => console.error(e.stack));
};

module.exports = initTables;
