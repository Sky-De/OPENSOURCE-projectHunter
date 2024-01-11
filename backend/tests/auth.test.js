import {test, expect, beforeAll, afterAll} from 'vitest'
import { setupDatabase, teardownDatabase } from './utils'
import { seq } from '../src/models/connection'
import { User } from '../src/models/user'
import { makeServer } from '../src/app'


beforeAll(async () => {
    // makeServer()

    await setupDatabase()
})

afterAll(async () => {
    await teardownDatabase()
})

test('should add 1 + 2 to be 3', () => {
    expect(1 + 2).toBe(3)
})