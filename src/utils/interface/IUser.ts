export interface User {
	id?: string;
	firstname: string;
	lastname: string;
	email: string;
	password: string;
	age: number;
}

export interface UpdateUser {
	id?: string;
	firstname?: string;
	lastname?: string;
	email?: string;
	password?: string;
	age?: number;
}


