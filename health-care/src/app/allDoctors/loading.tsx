"use client"
import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'

function loading() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-white">
      <div className="spinner-border text-primary" role="status" style={{ width: '4rem', height: '4rem',position:"relative", top:"100px", marginBottom:"250px"

       }}>
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  )
}

export default loading