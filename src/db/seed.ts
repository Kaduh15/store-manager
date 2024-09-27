import { client } from '.'

async function seed() {}

seed().finally(() => client.end())
