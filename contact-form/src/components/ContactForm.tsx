import  { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { FormValues } from '../formtypes';
import '../ContactForm.css';

export const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors},
    reset,
  } = useForm<FormValues>();

  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (data: FormValues) => {
    console.log('Form submitted:', data);
    setSubmitted(true);
    reset();
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Contact Us</h2>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="contact-form">
        <label htmlFor="name" className="form-label">Name</label>
        <input
          type="text"
          id="name"
          {...register('name', {
            required: 'Name is required',
          })}
          className="form-input"
        />
        <p className="form-error">{errors.name?.message}</p>

        <label htmlFor="email" className="form-label">Email</label>
        <input
          type="email"
          id="email"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: 'Invalid email format',
            },
          })}
          className="form-input"
        />
        <p className="form-error">{errors.email?.message}</p>

        <label htmlFor="message" className="form-label">Message</label>
        <textarea
          id="message"
          {...register('message', {
            required: 'Message is required',
          })}
          rows={1}
          className="form-input message-box"
        />
        <p className="form-error">{errors.message?.message}</p>

          <div className='button-wrapper'>
            <button type="submit" className="submit-button">Submit</button>
          </div>
        
        {submitted && <p className="form-success">Your message has been successfully sent.</p>}
      </form>
    </div>
  );
};

export default ContactForm;
