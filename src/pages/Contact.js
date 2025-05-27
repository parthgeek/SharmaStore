import React from "react";
import styled from "styled-components";

const Contact = () => {
  const Wrapper = styled.section`
    padding: 9rem 0 5rem 0;
    text-align: center;

    .container {
      margin-top: 6rem;

      .contact-form {
        max-width: 50rem;
        margin: auto;
        border-radius: 10rem;

        .contact-inputs {
          display: flex;
          flex-direction: column;
          gap: 3rem;
          border-radius: 100px;

          input[type="submit"] {
            cursor: pointer;
            transition: all 0.2s;

            &:hover {
              background-color: ${({ theme }) => theme.colors.white};
              border: 1px solid ${({ theme }) => theme.colors.btn};
              color: ${({ theme }) => theme.colors.btn};
              transform: scale(0.9);
            }
          }
        }
      }
    }
     
  `;

  return (
    <Wrapper>
      <h2 className="common-heading">Contact page</h2>

      <iframe
       src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27431.92486761255!2d76.65315269999999!3d30.746765299999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fe555e7bf2e91%3A0xffb409b433075d3!2z4KSW4KSw4KSh4KS8LCDgpKrgpILgpJzgpL7gpKwgMTQwMzAx!5e0!3m2!1shi!2sin!4v1747220363262!5m2!1shi!2sin" 
       width="600" 
       height="450" 
       style={{border:0}} 
       allowFullscreen=""
        loading="lazy" 
       referrerPolicy="no-referrer-when-downgrade"></iframe>

      <div className="container">
        <div className="contact-form">
          <form
            action="https://formspree.io/f/xbloqred"
            method="POST"
            className="contact-inputs">

            <input
              type="text"
              placeholder="username"
              name="username"
              required
              autoComplete="off"
            />

            <input
              type="email"
              name="Email"
              placeholder="Email"
              autoComplete="off"
              required
            />

            <textarea
              name="Message"
              cols="30"
              rows="10"
              required
              autoComplete="off"
              placeholder="Enter you message"></textarea>

            <input type="submit" value="send" />
          </form>
        </div>
      </div>
    </Wrapper>
  );
};

export default Contact;