import React from 'react'
import "./contacts.css";

const contacts = () => {
  return (
    <div>
        <section className='form-details'>
            <form action="">
                <span>LEAVE A MESSAGE</span>
                <h2>We love to hear from you</h2>
                <input type="text" placeholder='Your Name' />
                <input type="text" placeholder='E-mail' />
                <input type="text" placeholder='Subject' />
                <textarea name="" id=""  placeholder='Your Message'></textarea>
                <button className='normal'>Submit</button>
            </form>
        </section>
    </div>
  )
}

export default contacts