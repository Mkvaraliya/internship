import React from 'react'

const Footer = () => {
    return (
        < div className="bg-gray-900 text-white items-center md:place-items-start px-4 pt-8 w-full flex flex-col  md:flex-row flex-wrap justify-between" >
            <div className="mb-3">
                <img className="w-40 h-16" src="https://pwskills.com/images/PWSkills-white.png"></img>
                <p className="my-4">Email us: support@gmail.com</p>
                <img className="w-40 h-16" src="https://tse2.mm.bing.net/th?id=OIP.hk0NCRHrF6pwTzBjwTeBOAHaCl&pid=Api&P=0&h=220"></img>

            </div>

            <div className="mb-3 w-[209px]">
                <h2 className="font-bold text-xl mt-4">PW SKills</h2>
                <div className="w-32 h-1 border-2 border-yellow-400 rounded-2xl my-2"></div>
                <div>
                    <p>About Us</p>
                    <p>FAQs</p>
                    <p>Privacy Policy</p>
                </div>
            </div>
            <div className="mb-3 w-[209px]">
                <h2 className="font-bold text-xl mt-4">Products</h2>
                <div className="w-32 h-1 border-2 border-yellow-400 rounded-2xl my-2"></div>
                <div>
                    <p>PW Skills Lab</p>
                    <p>Job Portal</p>
                    <p>Experience Portal</p>
                    <p>Become an affiliate</p>
                    <p>Hall of Fame</p>
                </div>
            </div>
            <div className="mb-3 w-[209px]">
                <h2 className="font-bold text-xl mt-4">Links</h2>
                <div className="w-32 h-1 border-2 border-yellow-400 rounded-2xl my-2"></div>
                <div>
                    <p>Discord Channel</p>
                    <p>PW Youtube</p>
                    <p>Careers</p>
                </div>
            </div>
        </div >
    )
}

export default Footer
