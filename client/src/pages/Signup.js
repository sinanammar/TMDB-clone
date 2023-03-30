import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Input,
  Text,
  VStack,
  FormErrorMessage,
} from '@chakra-ui/react'

// Packages
import * as yup from 'yup'
import { Form } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import _debounce from 'lodash/debounce'

// API
import signupUser from '../API/signupUser'
import checkEmail from '../API/checkEmail'

// Hooks
import { useForm } from 'react-hook-form'
import { useRef, useState } from 'react'

const schema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().min(8).required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required(),
  email: yup.string().email().required(),
})

const Signup = () => {
  const [isEmailTaken, setIsEmailTaken] = useState(false)
  const emailRef = useRef(null)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) })

  const onSubmit = async (data) => {
    if (isEmailTaken) {
      return
    }
    await signupUser(data)
  }

  const checkEmailAvailability = async (e) => debounceEmail(e.target.value)

  const debounceEmail = _debounce(async (email) => {
    const isTaken = await checkEmail(email)

    if (isTaken === 'valid') {
      setIsEmailTaken(false)
    } else {
      setIsEmailTaken(true)
    }
  }, 1500)

  return (
    <Box h='80vh'>
      <Grid templateColumns='repeat(8, 1fr)'>
        <GridItem colSpan={2}></GridItem>
        <GridItem colSpan={{ base: 5, md: 4 }}>
          <VStack alignItems='flex-start'>
            <Box mt='16px' mb='24px'>
              <Text fontSize='24px' fontWeight='bold' color='main.900' pb='8px'>
                Sign up for an account
              </Text>
              <Text>
                Signing up for an account is free and easy. Fill out the form
                below to get started. JavaScript is required to to continue.
              </Text>
            </Box>
            {/* FORM FORM */}
            <Box w='100%'>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <FormControl id='username' mb={4} isInvalid={errors.username}>
                  <FormLabel fontWeight='light'>Username</FormLabel>
                  <Input type='text' {...register('username')} />
                  {errors.username && (
                    <FormErrorMessage>
                      {errors.username.message}
                    </FormErrorMessage>
                  )}
                </FormControl>

                <FormControl id='password' mb={4} isInvalid={errors.password}>
                  <FormLabel fontWeight='light'>Password</FormLabel>
                  <Input type='password' {...register('password')} />
                  {errors.password && (
                    <FormErrorMessage>
                      {errors.password.message}
                    </FormErrorMessage>
                  )}
                </FormControl>

                <FormControl
                  id='confirmPassword'
                  mb={4}
                  isInvalid={errors.confirmPassword}
                >
                  <FormLabel fontWeight='light'>Confirm Password</FormLabel>
                  <Input type='password' {...register('confirmPassword')} />
                  {errors.confirmPassword && (
                    <FormErrorMessage>
                      {errors.confirmPassword.message}
                    </FormErrorMessage>
                  )}
                </FormControl>

                <FormControl
                  id='email'
                  mb={4}
                  isInvalid={errors.email || isEmailTaken}
                >
                  <FormLabel fontWeight='light'>Email</FormLabel>

                  <Input
                    ref={emailRef}
                    type='email'
                    {...register('email')}
                    onChange={checkEmailAvailability}
                  />
                  {errors.email && (
                    <FormErrorMessage>{errors.email.message}</FormErrorMessage>
                  )}
                  {isEmailTaken && (
                    <FormErrorMessage>Email is already taken.</FormErrorMessage>
                  )}
                </FormControl>

                <Box pb='32px'>
                  <Text>
                    By clicking the "Sign up" button below, I certify that I
                    have read and agree to the TMDB terms of use and privacy
                    policy.
                  </Text>
                </Box>

                <Button
                  type='submit'
                  bg='#05B3E3'
                  color='white'
                  mr='16px'
                  _hover={{ bg: 'main.900' }}
                >
                  Sign up
                </Button>

                <Button
                  type='submit'
                  color='#05B3E3'
                  variant='ghost'
                  _hover={{ bg: 'white' }}
                >
                  Cancel
                </Button>
              </Form>
            </Box>
            {/* FORM FORM */}
          </VStack>
        </GridItem>
        <GridItem colSpan={{ base: 0, md: 1 }}></GridItem>
      </Grid>
    </Box>
  )
}

export default Signup
