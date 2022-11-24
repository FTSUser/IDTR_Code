import React, { useEffect } from 'react'
import '../home/home.scss';
import Announcement from './Announcement/Announcement';
import HeroBanner from './HeroBanner/HeroBanner';
import StartCourse from './StartCourse/StartCourse';
export default function Home() {
    useEffect(() => {
        window.scrollTo({
            top: 0,
            // left: 0,
            // behavior: "smooth",
        });
    }, []);
    return (
        <div>
            <>
                <HeroBanner />
            </>
            <>
                <StartCourse />
            </>
            {/* <>
                <Announcement />
            </> */}
        </div>
    )
}
