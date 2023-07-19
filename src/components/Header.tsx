import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "./ui/navigation-menu";
import "../index.css";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function Header() {
  return (
    <header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-14 items-center w-full justify-between">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem className="mr-4">
              <Link to="/"><h1 className="text-2xl">Blog<span className="text-transparent bg-clip-text bg-gradient-to-bl from-blue-500 to-purple-600">Master</span></h1></Link>
            </NavigationMenuItem>
            <NavigationMenuItem className={navigationMenuTriggerStyle()}>
              <Link to="/">
                Feed
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  Username
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="p-2">
                    <ul>
                      <li><a>Profile</a></li>
                      <li><a>Settings</a></li>
                    </ul>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <Link to="/login">
                <NavigationMenuItem>
                    <Avatar>
                      <AvatarImage src="" alt="" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </NavigationMenuItem>
              </Link>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
    </header>
  )
}