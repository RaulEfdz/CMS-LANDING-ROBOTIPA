'use client'

import * as React from "react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { configNav } from "@/app/db/routesNav"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import Link from "next/link"



 const activeConfig = {
   railItem: {
     className: "border-l-4 border-primary text-primary-foreground font-semibold pl-2 ", // Border on the left
     iconClass: "text-primary"
   },
   subItem: {
     className: "border-l-2 border-primary text-primary-foreground font-semibold pl-2", // Slightly smaller border for sub-items
     iconClass: "text-primary"
   }
 }


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  const { info, navMain } = configNav

  const isActiveParent = (route: string) =>
    pathname.startsWith(route) && route !== "/"

  const isActiveChild = (route: string) =>
    pathname === route

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>

              <Link href="/" className="hover:bg-accent/50 rounded-lg">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <span className="font-bold">{info.nameApp[0]}</span>
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">{info.nameApp}</span>
                  <span className="text-xs text-muted-foreground">{info.version}</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                {/* Ítem principal */}
                <SidebarMenuButton
                  asChild
                  isActive={isActiveParent(item.route)}
                  className={cn(
                    "transition-colors hover:bg-accent/50 rounded-none ", // Added rounded-md here for consistent hover effect
                    isActiveParent(item.route) && activeConfig.railItem.className
                  )}
                >
                  <Link href={item.route} className="font-medium block w-full"> {/* Added block and w-full for full width click area */}
                    {item.title}
                  </Link>
                </SidebarMenuButton>

                {/* Sub-ítems */}
                {item.items?.length && (
                  <SidebarMenuSub>
                    {item.items.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton
                          asChild
                          isActive={isActiveChild(subItem.route)}
                          className={cn(
                            "hover:bg-accent/50 rounded-none", // Added rounded-md here for consistent hover effect
                            isActiveChild(subItem.route) && activeConfig.subItem.className
                          )}
                        >
                          <a href={subItem.route} className="block w-full"> {/* Added block and w-full for full width click area */}
                            {subItem.title}
                          </a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                )}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  )
}