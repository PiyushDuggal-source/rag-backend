import { User } from '~/types/types';

import * as fs from 'fs';
import * as path from 'path';

const dataPath = path.join(__dirname, '../storage/users.json');

let users: User[] = [];

// Load users
if (fs.existsSync(dataPath)) {
  const fileData = fs.readFileSync(dataPath, 'utf-8');
  users = JSON.parse(fileData) as User[];
} else {
  fs.writeFileSync(dataPath, JSON.stringify(users, null, 2));
}

export const saveUser = (user: User) => {
  users.push(user);
  fs.writeFileSync(dataPath, JSON.stringify(users, null, 2));
};

export { users };
