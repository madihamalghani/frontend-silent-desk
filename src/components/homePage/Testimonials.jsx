import React from 'react'

function Testimonials() {
    return (
        <>
            <section className="testimonials">
                <h2 className="testimonial-heading">User's Experience</h2>

                <div className="testimonial-container">
                    <div className="testimonial">
                        <img src="../src/assets/user2.png" alt="User 1" />
                        <p>"This platform has been a game changer! I get honest feedback without any awkwardness!"</p>
                        <h4>- Sarah, Student</h4>
                    </div>

                    <div className="testimonial">
                        <img src="../src/assets/user1.png" alt="User 2" />
                        <p>"A great way to know what people think about me in a safe space. Highly recommended!"</p>
                        <h4>- Alex, Class Representative</h4>
                    </div>

                    <div className="testimonial">
                        <img src="../src/assets/user3.png" alt="User 3" />
                        <p>"The anonymous feature makes it super useful for open and honest conversations."</p>
                        <h4>- Mark, College Student</h4>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Testimonials
