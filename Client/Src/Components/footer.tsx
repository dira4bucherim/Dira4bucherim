import { Link } from "wouter";
import { Facebook, Instagram, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <h3 className="text-2xl font-bold mb-4">Dira4Bucherim</h3>
            <p className="text-gray-300 mb-4">
              Connecting yeshiva students with quality housing across Israel. 
              Making your learning journey comfortable and convenient.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/about">
                  <a className="hover:text-white transition-colors">About Us</a>
                </Link>
              </li>
              <li>
                <Link href="/listings">
                  <a className="hover:text-white transition-colors">Find Apartments</a>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <a className="hover:text-white transition-colors">Contact Us</a>
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Help Center
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center">
                <span className="text-sm">📞 +972-2-123-4567</span>
              </li>
              <li className="flex items-center">
                <span className="text-sm">✉️ info@dira4bucherim.com</span>
              </li>
              <li className="flex items-center">
                <span className="text-sm">📍 Jerusalem, Israel</span>
              </li>
            </ul>
          </div>
        </div>
        <hr className="border-gray-700 my-8" />
        <div className="text-center text-gray-400">
          <p>&copy; 2024 Dira4Bucherim. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
