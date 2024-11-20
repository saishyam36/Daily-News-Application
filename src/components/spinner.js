import React, { Component } from 'react'
import gear from '../gear.gif'

export default class Spinner extends Component {
  render() {
    return (
      <div className='text-center'>
        <img className='my-3' src={gear} alt="Loading..." />
      </div>
    )
  }
}
