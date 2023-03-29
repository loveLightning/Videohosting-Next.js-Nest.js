import React from 'react'
import { NextPage } from 'next'

export interface RoleTypes {
  Component: {
    isUser?: boolean
  }
  children: React.ReactNode
}

// eslint-disable-next-line @typescript-eslint/ban-types
export type NextPageAuth<P = {}> = NextPage<P> & RoleTypes
