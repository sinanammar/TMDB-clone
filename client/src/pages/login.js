import { Form } from 'react-router-dom'
import {
  FormControl,
  Input,
  FormLabel,
  Box,
  Center,
  Grid,
  GridItem,
  Flex,
  Text,
  Button,
} from '@chakra-ui/react'

import loginUser from '../API/loginUser'

// Hooks
import { useState } from 'react'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleUserLogin = async () => {
    try {
      await loginUser(username, password)
      setError('')
    } catch (e) {
      setError(e)
    }
  }

  return (
    <Box h='75vh'>
      <Grid templateColumns='repeat(6, 1fr)'>
        <GridItem colSpan={1}></GridItem>
        <GridItem colSpan={4} w='100vh'>
          <Text
            fontSize='24px'
            fontWeight='bold'
            color='main.900'
            pb='8px'
            pt='40px'
          >
            Sign up for an account
          </Text>
          <Text>
            In order to use the editing and rating capabilities of TMDB, as well
            as get personal recommendations you will need to login to your
            account. If you do not have an account, registering for an account
            is free and simple. Click here to get started.
          </Text>
          <Text pt='12px' pb='36px'>
            If you signed up but didn't get your verification email, click here
            to have it resent.
          </Text>
          <Flex display='flex' justifyContent='flext-start' w='100%'>
            <Form onSubmit={handleUserLogin}>
              <FormControl
                id='username'
                mb={4}
                pl={{ base: '24px', md: 0 }}
                w={{
                  base: '500px',
                  md: '600px',
                  lg: '800px',
                  xl: '1000px',
                  xl: '1300px',
                }}
              >
                <FormLabel fontWeight='light'>Username</FormLabel>
                <Input
                  type='text'
                  name='username'
                  onChange={(e) => setUsername(e.target.value)}
                />
              </FormControl>

              <FormControl
                id='password'
                mb={4}
                pl={{ base: '24px', md: 0 }}
                w={{
                  base: '500px',
                  md: '600px',
                  lg: '800px',
                  xl: '1000px',
                  xl: '1300px',
                }}
              >
                <FormLabel fontWeight='light'>Password</FormLabel>
                <Input
                  type='password'
                  name='password'
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>
            </Form>
          </Flex>
          {error && (
            <Text mb='12px' fontWeight='medium' color='red'>
              {error}
            </Text>
          )}

          <Box h='40vh'>
            <Button
              type='submit'
              bg='#05B3E3'
              color='white'
              mr='16px'
              onClick={handleUserLogin}
              _hover={{ bg: 'main.900' }}
            >
              Login
            </Button>
            <Button color='#05B3E3' variant='ghost' _hover={{ bg: 'white' }}>
              Reset password
            </Button>
          </Box>
        </GridItem>
        <GridItem colSpan={1}></GridItem>
      </Grid>
    </Box>
  )
}

export default Login
