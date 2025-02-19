import { Account, Client, Databases, ID } from 'appwrite'

const client = new Client()
client.setEndpoint('https://cloud.appwrite.io/v1').setProject('67b557b5000322bb36ac')

export const ACCOUNT = new Account(client)
export const DATABASE = new Databases(client)
export const UNIQUE_ID = ID