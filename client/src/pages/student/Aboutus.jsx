import React from "react";

const AboutUs = () => {
    const whyChooseData = [
        { text: "Certified Trainers" },
        { text: "Highly Interactive Sessions" },
        { text: "Skill-based Training" },
        { text: "Certification Focus" },
        { text: "Flexible Schedule" },
        { text: "Tailored Solutions" },
        { text: "Post Training Assistance" },
        { text: "Access Recorded Sessions" },
    ];

    const teamMembers = [
        {
          name: "Karan Singh",
          role: "Founder & CEO",
          img: "https://ui-avatars.com/api/?name=Karan+Singh&background=0D8ABC&color=fff&size=150",
          desc: "A successful entrepreneur with 10+ years of experience...",
        },
        {
          name: "Shalini Singh",
          role: "Co-Founder & COO",
          img: "https://ui-avatars.com/api/?name=Shalini+Singh&background=F59E0B&color=fff&size=150",
          desc: "An internet entrepreneur with 10+ years of experience...",
        },
        {
          name: "Aanchal Singh",
          role: "Chief Human Resource Officer",
          img: "https://ui-avatars.com/api/?name=Aanchal+Singh&background=EF4444&color=fff&size=150",
          desc: "A seasoned people leader, Aanchal drives the global HR function...",
        },
      ];
      

    return (
        <div className="font-sans text-gray-800">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-[#bfd7dc] to-[#f9f9f9] py-16">
                <div className="container mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
                    <div className="text-center md:text-left">
                        <h1 className="font-bold text-3xl md:text-4xl leading-snug">
                            Today's Skills And Certifications Will Be Valued{" "}
                            <span className="text-blue-600">Tomorrow</span>.
                        </h1>
                        <div className="grid grid-cols-3 gap-6 mt-8">
                            <div className="text-center">
                                <h3 className="text-2xl font-bold">1M+</h3>
                                <p className="text-gray-600">Careers Advanced</p>
                            </div>
                            <div className="text-center">
                                <h3 className="text-2xl font-bold">450+</h3>
                                <p className="text-gray-600">Live classes / month</p>
                            </div>
                            <div className="text-center">
                                <h3 className="text-2xl font-bold">100+</h3>
                                <p className="text-gray-600">Courses</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <img
                            src="https://as2.ftcdn.net/jpg/01/80/95/47/1000_F_180954769_Tdcl29JBWMx1wFgUa9tkZeTCqP2NbYMu.jpg"
                            alt="Our Team"
                            className="rounded-xl shadow-lg"
                        />
                    </div>
                </div>
            </section>

            {/* Who We Are */}
            <section className="py-14 bg-white">
                <div className="container mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
                    <div>
                        <h2 className="text-3xl font-bold mb-4">Who We Are</h2>
                        <p className="leading-relaxed text-gray-700">
                            Founded in 2021 and headquartered in Chicago (United States) with strategic offices in Noida and
                            Lucknow (India), theduocean has established itself as a global leader in digital skills training
                            and professional development. With a mission to empower individuals and organizations to thrive
                            in the digital economy, we collaborate with top universities, Fortune 50+ companies, and
                            recognized industry bodies to design cutting-edge learning solutions. Our curriculum integrates
                            live, instructor-led online classes, hands-on projects, and industry-relevant case studies,
                            ensuring learners gain practical expertise. By bridging academic excellence with real-world
                            application, theduocean equips professionals with the skills, certifications, and confidence to
                            accelerate career growth and drive organizational success worldwide.
                        </p>
                    </div>
                    <div className="bg-[#f4f9ff] p-6 rounded-lg shadow-md text-gray-800 font-medium text-lg">
                        Recognized as a global pioneer in digital skills development, theduocean, a Blackstone company,
                        enables learners worldwide to master next-generation digital capabilities. Through tailored
                        programs, hands-on training, and accredited certifications, we help professionals and
                        enterprises accelerate growth and remain competitive in a rapidly evolving digital landscape.
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-16 bg-gradient-to-r from-[#bfd7dc] to-[#f9f9f9]">
                <div className="container mx-auto px-6">
                    <h2 className="text-center text-3xl font-bold mb-10">
                        Why Choose theduocean?
                    </h2>
                    <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 text-center">
                        {whyChooseData.map((item, i) => (
                            <div
                                key={i}
                                className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center"
                            >
                                {/* Replace this div with an emoji or SVG */}
                                <div className="text-red-600 text-4xl mb-2">⭐</div>
                                <h5 className="mt-3 font-semibold">{item.text}</h5>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Leadership Team */}
            <section className="py-16">
                <div className="container mx-auto px-6">
                    <h2 className="text-center text-3xl font-bold mb-10">
                        Meet The Leadership Team
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {teamMembers.map((member, i) => (
                            <div
                                key={i}
                                className="text-center bg-white shadow-md rounded-lg p-6"
                            >
                                <img
                                    src={member.img}
                                    alt={member.name}
                                    className="w-32 h-32 rounded-full mx-auto border-4 border-gray-200 mb-4 object-cover"
                                />
                                <h5 className="font-bold">{member.name}</h5>
                                <p className="text-gray-500 text-sm">{member.role}</p>
                                <p className="text-sm mt-2">{member.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Vision & Mission */}
            <section className="py-16 bg-gradient-to-r from-[#bfd7dc] to-[#f9f9f9]">
                <div className="container mx-auto px-6 grid md:grid-cols-2 gap-10">
                    <div>
                        <h3 className="font-bold text-2xl mb-3">Our Vision</h3>
                        <p className="leading-relaxed text-gray-700">
                            Walking on the trail of a high-performance learning culture,
                            theduocean is constantly acing towards...
                        </p>
                    </div>
                    <div>
                        <h3 className="font-bold text-2xl mb-3">Our Mission</h3>
                        <p className="leading-relaxed text-gray-700">
                            Our mission is continuously developing and updating interactive
                            learning courses for emerging technologies...
                        </p>
                    </div>
                </div>
            </section>

            {/* Join Us */}
            <section className="py-16 bg-gradient-to-r from-[#547171] to-[#598e8f] text-white">
                <div className="container mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
                    <div className="text-center md:text-left">
                        <img
                            src="https://img.freepik.com/premium-photo/laptop-ppt-presentation-business-meeting-team-working-review-new-digital-website-design-planning-group-marketing-strategy-diversity-corporate-people-collaboration-online-project_590464-80700.jpg"
                            alt="Join Us"
                            className="rounded-lg shadow-lg"
                        />
                    </div>
                    <div>
                        <span className="bg-green-500 px-3 py-1 rounded text-sm font-semibold">
                            JOIN US!
                        </span>
                        <h2 className="text-3xl font-bold mt-4">
                            Interested in Joining theduocean?
                        </h2>
                        <p className="mt-4 leading-relaxed">
                            Refer your friends and connections, get exclusive rewards within
                            30 working days for each friend who enrolls.
                        </p>
                        <button className="mt-6 bg-blue-300 text-[#406e7b] px-6 py-3 rounded-lg font-semibold">
                            Know More →
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutUs;
