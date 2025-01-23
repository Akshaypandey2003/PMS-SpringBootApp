import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@radix-ui/react-hover-card";

const Footer = () => {
  return (
    <footer className="bg-gray-900 footer bg-gray-800 text-white py-6">
      <div className="container mx-auto flex p-10 md:flex-row justify-between items-center">
        <div className="branding border">
          <h2 className="text-3xl">PMS</h2>
        </div>

        <div className="links flex gap-8 m-auto">
          <HoverCard   className="m-4">
            <HoverCardTrigger>
                <p className="hover:cursor-pointer">About</p>
            </HoverCardTrigger>
            <HoverCardContent>
              The React Framework – created and maintained by @vercel.
            </HoverCardContent>
          </HoverCard>

          <HoverCard  className="m-4">
            <HoverCardTrigger>
                <p className="hover:cursor-pointer">Privacy Policy</p>
            </HoverCardTrigger>
            <HoverCardContent>
              The React Framework – created and maintained by @vercel.
            </HoverCardContent>
          </HoverCard>

          <HoverCard  className="m-4">
            <HoverCardTrigger>
                <p className="hover:cursor-pointer">Contact</p>
            </HoverCardTrigger>
            <HoverCardContent>
              The React Framework – created and maintained by @vercel.
            </HoverCardContent>
          </HoverCard>
        </div>

        <div className="social-media flex gap-4 border">
          <a href="https://facebook.com">Facebook</a>
          <a href="https://twitter.com">Twitter</a>
          <a href="https://linkedin.com">LinkedIn</a>
        </div>
      </div>
      <div className="">
          <h1 className="text-center">© 2025 Your Company. All rights reserved.</h1>
      </div>
      
    </footer>
  );
};

export default Footer;
