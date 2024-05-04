import { Link } from "react-router-dom"


const Footer = () => {
    return (
            <div className="footer bg-gray-900 text-white">
                <div className="container mx-auto flex flex-wrap px-8 py-12">
                    <div className="w-1/2 lg:w-1/5 pt-8">
                        <h1 className="uppercase mb-4 text-md md:text-lg md:font-semibold">Company</h1>
                        <ul className="text-md md:text-lg ">
                            <li>About</li>
                            <li>Mission</li>
                            <li>Services</li>
                            <li>Social</li>
                            <li>Get in touch</li>
                        </ul>
                    </div>
                    <div className="w-1/2 lg:w-1/5 pt-8">
                        <h1 className="uppercase mb-4 text-md md:text-lg font-semibold">Products</h1>
                        <ul className="text-md text-white md:text-lg ">
                           <li><Link className="text-white" to={"/search/laptop"} onClick={()=>window.scroll(0,0)}>Laptop</Link></li>
                           <li><Link className="text-white" to={"/search/mobile"} onClick={()=>window.scroll(0,0)}>Mobile</Link></li>
                           <li><Link className="text-white" to={"/search/wearables"} onClick={()=>window.scroll(0,0)}>Wearables</Link></li>
                           <li><Link className="text-white" to={"/search/pc"} onClick={()=>window.scroll(0,0)}>Pc's</Link></li>
                           <li><Link className="text-white" to={"/search/shoe"} onClick={()=>window.scroll(0,0)}>Shoe</Link></li>
                        </ul>
                    </div>
                    <div className="w-1/2 lg:w-1/5 pt-8">
                        <h1 className="uppercase mb-4 text-md md:text-lg font-semibold">Resources</h1>
                        <ul className="text-md md:text-lg ">
                            <li>Webmail</li>
                            <li>Redeem code</li>
                            <li>WHOIS lookup</li>
                            <li>Site map</li>
                            <li>Web templates</li>
                            <li>Email templates</li>
                        </ul>
                    </div>
                    <div className="w-1/2 lg:w-1/5 pt-8">
                        <h1 className="uppercase mb-4 text-md md:text-lg font-semibold">Support</h1>
                        <ul className="text-md md:text-lg ">
                            <li>Contact us</li>
                            <li>Web chat</li>
                            <li>Open ticket</li>
                        </ul>
                    </div>
                    <div className="w-full flex justify-center lg:w-1/5 pt-8">
                        <h1 className="uppercase mb-4 text-md md:text-lg font-semibold">Social</h1>
                        <ul className="flex text-md md:text-lg ">
                            <li><img src="https://svgshare.com/i/5fq.svg" width="32" className="w-8 h-8" /></li>
                            <li><img src="https://svgshare.com/i/5eA.svg" width="32" className="w-8 h-8" /></li>
                            <li><img src="https://svgshare.com/i/5f_.svg" width="32" className="w-8 h-8" /></li>
                        </ul>
                    </div>
                </div>
            </div>

    )
}

export default Footer
