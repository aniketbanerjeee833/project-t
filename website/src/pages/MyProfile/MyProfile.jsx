import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDeleteProfileMutation, useGetAllProfilesByUserQuery } from "../../redux/api/profileApi";



export default function MyProfile() {

      const [profileType, setProfileType] = useState("");

    
  const navigate = useNavigate();
    const {loggedInUser} = useSelector((state) => state.user);
    console.log(loggedInUser)
const userId=loggedInUser?.id
    const{data:profiles} = useGetAllProfilesByUserQuery(userId, { skip: !userId });
    console.log(profiles)
    const[deleteProfile] = useDeleteProfileMutation();
  const handleProfileType = () => {
    if (!profileType) {
      toast.error("Please select a profile type");
      return;
    }

    navigate(`/profile?profile=${profileType}`);
  };
const encodeId = (id) => {
  return btoa(id.toString()); // browser base64
};

const handleViewProfile = (id) => {
  if(!id){
    toast.error("Please select a profile");
    return;
  }
  const encodedId = encodeId(id);
  //navigate(`/profile-details?profile_id=${encodedId}`);
   navigate(`/profile/${encodedId}`);
}
  const handleEditProfile = (id) => {
    if(!id){
      toast.error("Please select a profile");
      return;
    }
    const encodedId = encodeId(id);
    //navigate(`/edit-profile?edit_id=${encodedId}`);
     navigate(`/edit-profile/${encodedId}`);
  };

  const handleDeleteProfile = async (id) => {
    if(!id){
      toast.error("Please select a profile");
      return;
    }
    try {
      await deleteProfile(id).unwrap();
      toast.success("Profile deleted successfully");
    } catch (error) {
      console.error("Error deleting profile:", error);
    }
  };
  return (
    <>
    {/* <!-- ##### Breadcrumb Area Start ##### --> */}
    <section className="breadcrumb-area bg-img bg-overlay jarallax" 
   style={{ backgroundImage: `url(/assets/img/bg-img/13.jpg)` }}
    >
        <div className="container h-100">
            <div className="row h-100 align-items-center">
                <div className="col-12">
                    <div className="breadcrumb-content">
                        <h2>MANAGE YOUR PROFILE</h2>
                    </div>
                </div>
            </div>
        </div>
    </section>
    {/* <!-- ##### Breadcrumb Area End ##### --> */}

 <div className="profile-area section-padding-100">
  <div className="container">
    <div className="row">

      {/* <!-- LEFT SIDE (Add Profile) --> */}
      <div className="col-lg-4">
        <div className="add-profile-box text-center">

          <div className="icon-circle">
            <i className="fa fa-user-plus"></i>
          </div>

          <h4>Add Your Profile</h4>

          {/* <div className="profile-type">
            <label><input type="checkbox"/> HUMAN</label>
            <label><input type="checkbox"/> PET</label>
            <label><input type="checkbox"/> OTHER</label>
          </div>

          <button onClick={()=>handleProfileType()}
           className="add-btn">
            <i className="fa fa-arrow-right"></i>
          </button> */}
           <div className="profile-type">
        <label>
           
          <input
            type="radio"
            name="profile"
            value="HUMAN"
            onChange={(e) => setProfileType(e.target.value)}
          />
          HUMAN
        </label>

        <label>
          <input
            type="radio"
            name="profile"
            value="PET"
            onChange={(e) => setProfileType(e.target.value)}
          />
          PET
        </label>

        <label>
          <input
            type="radio"
            name="profile"
            value="OTHER"
            onChange={(e) => setProfileType(e.target.value)}
          />
          OTHER
        </label>
      </div>

      <button onClick={handleProfileType} className="add-btn">
        <i className="fa fa-arrow-right"></i>
      </button>
    

        </div>
      </div>

      {/* <!-- RIGHT SIDE (Profile List) --> */}
      {/* <div className="col-lg-8">
        <div className="profile-list">

         
          <div className="profile-item">
            <div className="profile-left">
              <img src="/assets/img/user.png"/>
              <h5>Sangita Dey</h5>
            </div>

            <div className="profile-actions">
              <button className="view"><i className="fa fa-eye"></i></button>
              <button className="edit"><i className="fa fa-pencil"></i></button>
              <button className="delete"><i className="fa fa-trash"></i></button>
            </div>
          </div>

         
          <div className="profile-item">
            <div className="profile-left">
              <img src="/assets/img/user.png"/>
              <h5>Techpromind Developer</h5>
            </div>

            <div className="profile-actions">
              <button className="view"><i className="fa fa-eye"></i></button>
              <button className="edit"><i className="fa fa-pencil"></i></button>
              <button className="delete"><i className="fa fa-trash"></i></button>
            </div>
          </div>

         
          <div className="profile-item">
            <div className="profile-left">
              <img src="/assets/img/user.png"/>
              <h5>Test2455</h5>
            </div>

            <div className="profile-actions">
              <button className="view"><i className="fa fa-eye"></i></button>
              <button className="edit"><i className="fa fa-pencil"></i></button>
              <button className="delete"><i className="fa fa-trash"></i></button>
            </div>
          </div>

        </div>
      </div> */}
      <div className="col-lg-8">
  <div className="profile-list">

    {profiles && profiles.length > 0 ? (
      profiles.map((profile) => (
        <div className="profile-item" key={profile.id}>
          <div className="profile-left">
            <img
              src={
                profile.image
                  ? `http://localhost:4000/${profile.image}`
                  : "/assets/img/user.png"
              }
            />
            <h5>{profile.name}</h5>
          </div>

          <div className="profile-actions">
            <button
              onClick={() => handleViewProfile(profile.id)}
             className="view">
              <i className="fa fa-eye"></i>
            </button>
            <button 
            onClick={()=>handleEditProfile(profile.id)}
            className="edit">
              <i className="fa fa-pencil"></i>
            </button>
            <button 
            onClick={() => {
              if (window.confirm("Are you sure you want to delete this profile?")) {
                handleDeleteProfile(profile.id);
                // Call the delete mutation here, e.g., deleteIndividualProfile(profile.id);
                // You would need to import and use the deleteIndividualProfile mutation from your API slice
              }
            }}
            className="delete">
              <i className="fa fa-trash"></i>
            </button>
          </div>
        </div>
      ))
    ) : (
      <p>No profiles found</p>
    )}

  </div>
</div>

    </div>
  </div>
</div>
    </>
  )
}
