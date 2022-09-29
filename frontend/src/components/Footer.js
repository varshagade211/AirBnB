import './Footer.css'
function Footer() {
    return (
        <footer className='footer'>

              <p className='footerTxt'>© 2022 spots-bnb, Inc, . Privacy·Terms·Sitemap</p>
              <div className='footerAboutLinksContainer'>
                <a href= "https://www.linkedin.com/in/varsha-gade-7b33aa174/"  target="_blank" className='linkedInLink'><i className="fa-brands fa-linkedin linkedInIcon"></i></a>
                <a href='https://github.com/varshagade211/AirBnB' target="_blank" className='gitHubLink'><i className="fa-brands fa-github gitHubIcon"></i></a>
                <a href="https://varshagade211.github.io/" target="_blank" className='portfolioLink'><i className="fa-solid fa-folder-open portfolioIcon"></i></a>
              </div>
              <p className='footerTxt'> <i className="fa-solid fa-globe languageIcon"></i>English (US)</p>

         </footer>
    )
}

export default Footer
