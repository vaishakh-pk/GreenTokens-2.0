import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-black text-center text-white py-4 text-xs backgroundMain">
      <p>© {new Date().getFullYear()} GreenTokens</p>
    </footer>
  );
}

export default Footer
