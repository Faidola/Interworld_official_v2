import React from 'react';
import EditStudentProfile from './EditStudentProfile';
import EditSchoolProfile from './EditSchoolProfile';

interface EditProfileProps {
  onBack: () => void;
  onSave: (data: any) => void;
  userData: {
    name: string;
    email: string;
    userType: 'student' | 'school';
  };
}

const EditProfile = ({ onBack, userData }: EditProfileProps) => {
  switch (userData.userType) {
    case 'student':
      return <EditStudentProfile onBack={onBack} userData={userData} />;
    case 'school':
      return <EditSchoolProfile onBack={onBack} userData={userData} />;
    default:
      return null;
  }
};

export default EditProfile;
