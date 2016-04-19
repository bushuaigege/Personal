package com.hk.ws.model.sys;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.*;

import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotEmpty;

@Table(name = "Users_tbl")
public class UsersTbl implements Serializable{
    /** 
	* @Fields serialVersionUID : 
	*/
	private static final long serialVersionUID = 1L;

	/**
     * ID
     */
    @Id
    @Column(name = "Users_tbl_Id")
    private String usersTblId;

    /**
     * 用户姓名
     */
    @NotEmpty(message="{realname.not.empty}")
    @Column(name = "RealName")
    private String realname;

    /**
     * 登录名
     */
    @NotEmpty(message="{name.not.empty}")
    @Column(name = "LoginName")
    private String loginname;

    /**
     * 密码
     */
    @NotEmpty(message="{password.not.empty}")
    @Column(name = "PassWord")
    private String password;

    /**
     * 描述
     */
    @Column(name = "Description")
    private String description;

    /**
     * 联系电话
     */
    @Length(max=11,min=11,message="{phone.not.correct}")
    @Column(name = "Phone")
    private String phone;

    /**
     * 邮箱
     */
    @Email(message="{email.not.correct}")
    @Column(name = "Email")
    private String email;

    /**
     * 是否有效
     */
    @Column(name = "Isvalid")
    private Boolean isvalid;

    @Column(name = "FaceImg")
    private String faceimg;

    /**
     * 是否删除
     */
    @Column(name = "IsDelete")
    private Boolean isdelete;

    /**
     * 创建人
     */
    @Column(name = "CreateUserId")
    private String createuserid;

    /**
     * 创建时间
     */
    @Column(name = "CreateDateTime")
    private Date createdatetime;

    /**
     * 修改人
     */
    @Column(name = "UpdateUserId")
    private String updateuserid;

    /**
     * 修改时间
     */
    @Column(name = "UpdateDateTime")
    private Date updatedatetime;

    /**
     * 获取ID
     *
     * @return Users_tbl_Id - ID
     */
    public String getUsersTblId() {
        return usersTblId;
    }

    /**
     * 设置ID
     *
     * @param usersTblId ID
     */
    public void setUsersTblId(String usersTblId) {
        this.usersTblId = usersTblId == null ? null : usersTblId.trim();
    }

    /**
     * 获取用户姓名
     *
     * @return RealName - 用户姓名
     */
    public String getRealname() {
        return realname;
    }

    /**
     * 设置用户姓名
     *
     * @param realname 用户姓名
     */
    public void setRealname(String realname) {
        this.realname = realname == null ? null : realname.trim();
    }

    /**
     * 获取登录名
     *
     * @return LoginName - 登录名
     */
    public String getLoginname() {
        return loginname;
    }

    /**
     * 设置登录名
     *
     * @param loginname 登录名
     */
    public void setLoginname(String loginname) {
        this.loginname = loginname == null ? null : loginname.trim();
    }

    /**
     * 获取密码
     *
     * @return PassWord - 密码
     */
    public String getPassword() {
        return password;
    }

    /**
     * 设置密码
     *
     * @param password 密码
     */
    public void setPassword(String password) {
        this.password = password == null ? null : password.trim();
    }

    /**
     * 获取描述
     *
     * @return Description - 描述
     */
    public String getDescription() {
        return description;
    }

    /**
     * 设置描述
     *
     * @param description 描述
     */
    public void setDescription(String description) {
        this.description = description == null ? null : description.trim();
    }

    /**
     * 获取联系电话
     *
     * @return Phone - 联系电话
     */
    public String getPhone() {
        return phone;
    }

    /**
     * 设置联系电话
     *
     * @param phone 联系电话
     */
    public void setPhone(String phone) {
        this.phone = phone == null ? null : phone.trim();
    }

    /**
     * 获取邮箱
     *
     * @return Email - 邮箱
     */
    public String getEmail() {
        return email;
    }

    /**
     * 设置邮箱
     *
     * @param email 邮箱
     */
    public void setEmail(String email) {
        this.email = email == null ? null : email.trim();
    }

    /**
     * 获取是否有效
     *
     * @return Isvalid - 是否有效
     */
    public Boolean getIsvalid() {
        return isvalid;
    }

    /**
     * 设置是否有效
     *
     * @param isvalid 是否有效
     */
    public void setIsvalid(Boolean isvalid) {
        this.isvalid = isvalid;
    }

    /**
     * @return FaceImg
     */
    public String getFaceimg() {
        return faceimg;
    }

    /**
     * @param faceimg
     */
    public void setFaceimg(String faceimg) {
        this.faceimg = faceimg == null ? null : faceimg.trim();
    }

    /**
     * 获取是否删除
     *
     * @return IsDelete - 是否删除
     */
    public Boolean getIsdelete() {
        return isdelete;
    }

    /**
     * 设置是否删除
     *
     * @param isdelete 是否删除
     */
    public void setIsdelete(Boolean isdelete) {
        this.isdelete = isdelete;
    }

    /**
     * 获取创建人
     *
     * @return CreateUserId - 创建人
     */
    public String getCreateuserid() {
        return createuserid;
    }

    /**
     * 设置创建人
     *
     * @param createuserid 创建人
     */
    public void setCreateuserid(String createuserid) {
        this.createuserid = createuserid == null ? null : createuserid.trim();
    }

    /**
     * 获取创建时间
     *
     * @return CreateDateTime - 创建时间
     */
    public Date getCreatedatetime() {
        return createdatetime;
    }

    /**
     * 设置创建时间
     *
     * @param createdatetime 创建时间
     */
    public void setCreatedatetime(Date createdatetime) {
        this.createdatetime = createdatetime;
    }

    /**
     * 获取修改人
     *
     * @return UpdateUserId - 修改人
     */
    public String getUpdateuserid() {
        return updateuserid;
    }

    /**
     * 设置修改人
     *
     * @param updateuserid 修改人
     */
    public void setUpdateuserid(String updateuserid) {
        this.updateuserid = updateuserid == null ? null : updateuserid.trim();
    }

    /**
     * 获取修改时间
     *
     * @return UpdateDateTime - 修改时间
     */
    public Date getUpdatedatetime() {
        return updatedatetime;
    }

    /**
     * 设置修改时间
     *
     * @param updatedatetime 修改时间
     */
    public void setUpdatedatetime(Date updatedatetime) {
        this.updatedatetime = updatedatetime;
    }
}