import { jwtDecode } from "jwt-decode";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { AuthService } from "../../../services/auth/auth.service";
import { AdminsService } from "../../../services/admins/admins.service";
import { checkPasswordStrength } from "../../../utils/checkPasswordStrength";
import { TranslationService } from "../../../services/translation/translation.service";

@Component({
  selector: "app-profile",
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {
  adminData: any = null;
  isEditModalOpen: boolean = false;
  isDeleteModalOpen: boolean = false;
  isEditingName: boolean = false;
  isEditingLogin: boolean = false;
  editedName: string = "";
  editedLogin: string = "";
  editedPassword: string = "";
  editedPasswordConfirm: string = "";
  editedPasswordError: string = "";

  constructor(
    private adminsService: AdminsService,
    private authService: AuthService,
    private translationService: TranslationService
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem("jwt_token");
    if (token) {
      const decodedToken: any = jwtDecode(token);
      const adminId = decodedToken?.id;

      if (adminId) {
        this.adminsService.getAdminById(adminId).subscribe(
          data => {
            this.adminData = data;
            this.editedName = data.name;
            this.editedLogin = data.login;
          },
          error => console.error("Error fetching admin data", error)
        );
      }
    }
  }

  openEditModal(): void {
    this.isEditModalOpen = true;
  }

  closeEditModal(): void {
    this.isEditModalOpen = false;
    this.editedPassword = "";
    this.editedPasswordConfirm = "";
    this.editedPasswordError = "";
  }

  openDeleteModal(): void {
    this.isDeleteModalOpen = true;
  }

  closeDeleteModal(): void {
    this.isDeleteModalOpen = false;
  }

  saveNameChange(): void {
    if (!this.editedName || this.editedName === this.adminData.name) {
      this.isEditingName = false;
      return;
    }

    this.adminsService.updateAdmin(this.adminData.adminID, { name: this.editedName }).subscribe(
      () => {
        this.adminData.name = this.editedName;
        this.isEditingName = false;
      },
      error => console.error("Error updating name", error)
    );
  }

  saveLoginChange(): void {
    if (!this.editedLogin || this.editedLogin === this.adminData.login) {
      this.isEditingLogin = false;
      return;
    }

    this.adminsService.updateAdmin(this.adminData.adminID, { login: this.editedLogin }).subscribe(
      () => {
        this.adminData.login = this.editedLogin;
        this.isEditingLogin = false;
      },
      error => console.error("Error updating login", error)
    );
  }

  savePasswordChange(): void {
    if (!this.editedPassword || !this.editedPasswordConfirm) {
      this.translationService
        .translateKey("profile.profile-change-password-modal-empty-error")
        .subscribe(translatedMessage => {
          this.editedPasswordError = translatedMessage;
        });
      return;
    }

    if (this.editedPassword !== this.editedPasswordConfirm) {
      this.translationService
        .translateKey("profile.profile-change-password-modal-not-matching-error")
        .subscribe(translatedMessage => {
          this.editedPasswordError = translatedMessage;
        });
      return;
    }

    if (!checkPasswordStrength(this.editedPassword)) {
      this.translationService
        .translateKey("profile.profile-change-password-modal-weak-error")
        .subscribe(translatedMessage => {
          this.editedPasswordError = translatedMessage;
        });
      return;
    }

    this.adminsService
      .updateAdmin(this.adminData.adminID, { password: this.editedPassword })
      .subscribe(
        () => {
          this.adminData.password = this.editedPassword;
          this.closeEditModal();
        },
        error => console.error("Error updating password", error)
      );
  }

  logout(): void {
    this.authService.logout();
    window.location.href = "/admin";
  }

  deleteAccount(): void {
    this.adminsService.deleteAdmin(this.adminData.adminID).subscribe(
      () => {
        localStorage.removeItem("jwt_token");
        window.location.href = "/admin/login";
      },
      error => console.error("Error deleting admin account", error)
    );
  }

  isPasswordValid(): boolean {
    return this.editedPassword === this.editedPasswordConfirm && this.editedPassword.length > 0;
  }
}
