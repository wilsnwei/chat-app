import express from 'express';

export default class AuthControllers {
  static signUp = (req, res) => {
    res.send('signing up')
  }

  static login = (req, res) => {
    res.send('logging in')
  }

  static logout = (req, res) => {
    res.send('logging out')
  }
}