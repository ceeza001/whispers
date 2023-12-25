import React from 'react'
import { Link } from "react-router-dom";

const About = () => {
  return (
  		<div className="md:flex gap-[5rem] justify-between items-center text-text-color w-full">
        <div className="w-full">
          <h3 className="gradient-text body-bold">Brief intro</h3>
          <h1 className="h2-bold text-white">Anonymous Conversations, Genuine Connections.</h1>
          <p className="my-2 base-semibold">
            Introducing Whispers, a groundbreaking anonymous chat platform that empowers genuine connections in a privacy-focused world. Express yourself authentically, free from judgment, and foster meaningful connections without revealing personal details. Join a community built on mutual understanding and respect, where every user's voice is heard.
          </p>
          <p className="my-2 base-semibold">
            Our user-friendly platform, created with simplicity in mind, invites you to join the conversation. Since our inception, our goal has been to break free from communication limitations and foster unrestricted, authentic interaction. Explore Whispers and experience the power of genuine connections.
          </p>
        </div>

        <div className="flex flex-col gap-4 text-center w-full mt-[4rem]">
          <Link
            to="/sign-up"
            className="min-w-full my-4 border-2 border-primary-500 rounded-lg p-2">
            Get Started
          </Link>
          <h1 className="body-bold">Interested in discovering people's opinions about you?</h1>
          <p className="my-4 text-text-color body-bold">Sit back and let the whispers gently reveal their secrets.</p>
          
        </div>
      </div>
  )
}

export default About