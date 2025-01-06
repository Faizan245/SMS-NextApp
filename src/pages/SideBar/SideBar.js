'use client'
import Image from "next/image";
import Link from "next/link";
import logo from "../assets/logo.png";
import { useAuth } from '../../../context/AuthContext';
export default function Sidebar() {
    const { logout } = useAuth();
    return (
        <div className="bg-gray-800 text-white w-64 h-screen p-4 flex flex-col justify-between">
            <div>
                <Image src={logo} alt="bps logo" />
                <h2 className="text-xl text-center font-bold mb-6">Budana Public School</h2>
                <nav className="flex flex-col gap-2">
                    <Link href="/" className="hover:text-gray-400">Home</Link>
                    <Link href="/admission" className="hover:text-gray-400">Admission</Link>
                    <Link href="/student-section" className="hover:text-gray-400">Student Section</Link>
                    <Link href="/fees-management" className="hover:text-gray-400">Fees Management</Link>
                    <Link href="/result" className="hover:text-gray-400">Result</Link>
                    <Link href="/promotion-activity" className="hover:text-gray-400">Promotion Activity</Link>
                    <Link href="/transfer-certificate" className="hover:text-gray-400">Transfer Certificate</Link>
                    <Link href="/student-attendance" className="hover:text-gray-400">Student Attendance</Link>
                    <Link href="/search-box" className="hover:text-gray-400">Search Box</Link>
                    <Link href="/send-notice" className="hover:text-gray-400">Send Notice</Link>
                </nav>
            </div>
            <div className="flex justify-center">
                <button onClick={logout} className="bg-gray-900 hover:bg-gray-700 text-white rounded-xl font-semibold py-1 px-3">
                    Log Out
                </button>
            </div>
        </div>
    );
}
