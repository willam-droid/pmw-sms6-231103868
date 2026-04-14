import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  toggleSidebar() {
    if (window.innerWidth >= 992) {
      // Desktop behavior
      document.body.classList.toggle('sidebar-collapse');
    } else {
      // Mobile behavior
      document.body.classList.toggle('sidebar-open');
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {

    // 1. Only do this if the sidebar is actually open (mobile mode)
    if (document.body.classList.contains('sidebar-open')) {

      // 2. Find the sidebar and the hamburger button on the screen
      const sidebar = document.querySelector('.main-sidebar');
      // Update this selector if your hamburger button has a specific ID or different class
      const hamburgerButton = document.querySelector('.fa-bars')?.closest('a');

      // 3. Check if the user clicked INSIDE those elements
      const clickedInsideSidebar = sidebar?.contains(event.target as Node);
      const clickedHamburger = hamburgerButton?.contains(event.target as Node);

      // 4. If they clicked OUTSIDE both of them, shrink the menu!
      if (!clickedInsideSidebar && !clickedHamburger) {
        document.body.classList.remove('sidebar-open');
      }
    }
  }

  isDarkMode = true;

  toggleDarkMode() {
    // Flip the state (true becomes false, false becomes true)
    this.isDarkMode = !this.isDarkMode;

    // Toggle the dark-mode class on the body
    document.body.classList.toggle('dark-mode');

    // Find the navbar element so we can update its colors
    const navbar = document.querySelector('.main-header.navbar');

    if (this.isDarkMode) {
      // Switch navbar to Dark Theme
      navbar?.classList.remove('navbar-white', 'navbar-light');
      navbar?.classList.add('navbar-dark', 'bg-dark');
    } else {
      // Switch navbar to Light Theme
      navbar?.classList.remove('navbar-dark', 'bg-dark');
      navbar?.classList.add('navbar-white', 'navbar-light');
    }
  }

}
