import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { jwtDecode } from "jwt-decode";
import { Admin } from "../../../interfaces/admin";
import { AdminsService } from "../../../services/admins/admins.service";
import { checkPasswordStrength } from "../../../utils/checkPasswordStrength";

@Component({
  selector: "app-admins",
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: "./admins.component.html",
  styleUrls: ["./admins.component.css"]
})
export class AdminsComponent implements OnInit {
  admins: any[] = [];
  isModalOpen = false;
  newAdmin = { name: "", login: "", password: "", role: "Admin" };
  isDeleteModalOpen = false;
  deletedAdminId: string = "";
  currentAdminId: string = "";
  creatingAdminError: string = "";

  constructor(private adminsService: AdminsService) {}

  ngOnInit(): void {
    this.loadAdmins();
    this.getCurrentAdminId();
  }

  loadAdmins(): void {
    this.adminsService.getAllAdmins().subscribe(
      (data: any) => {
        this.admins = data;
      },
      (error: any) => {
        console.error("Error loading admins", error);
      }
    );
  }

  getCurrentAdminId(): void {
    const token = localStorage.getItem("jwt_token");
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        this.currentAdminId = decodedToken.id;
      } catch (error) {
        console.error("Error decoding JWT token:", error);
      }
    } else {
      console.error("JWT token not found in localStorage");
    }
  }

  openCreateModal(): void {
    this.isModalOpen = true;
  }

  closeCreateModal(): void {
    this.isModalOpen = false;
    this.newAdmin = { name: "", login: "", password: "", role: "Admin" };
  }

  createAdmin(): void {
    if (!this.newAdmin.name || !this.newAdmin.login || !this.newAdmin.password) {
      this.creatingAdminError = "Please fill in all fields";
      return;
    }

    if (checkPasswordStrength(this.newAdmin.password) === false) {
      this.creatingAdminError =
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.";
      return;
    }

    this.adminsService.createAdmin(this.newAdmin).subscribe(
      () => {
        this.loadAdmins();
        this.closeCreateModal();
      },
      error => {
        console.error("Error creating admin", error);
      }
    );
  }

  openDeleteModal(adminId: Admin): void {
    this.isDeleteModalOpen = true;
    this.deletedAdminId = adminId.adminID.toString();
  }

  closeDeleteModal(): void {
    this.isDeleteModalOpen = false;
  }

  deleteAdmin(adminId: string): void {
    this.adminsService.deleteAdmin(adminId).subscribe(
      () => {
        this.loadAdmins();
        this.closeDeleteModal();
        this.deletedAdminId = "";
      },
      (error: any) => {
        console.error("Error deleting admin", error);
      }
    );
  }
}
