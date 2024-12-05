import React, { useState } from "react";

export default function SkillsForm() {
  const [searchText, setSearchText] = useState("");
  const [userSkills, setUserSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");

  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleAddSkill = () => {
    if (newSkill.trim() !== "") {
      setUserSkills([...userSkills, newSkill]);
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    const updatedSkills = userSkills.filter((skill) => skill !== skillToRemove);
    setUserSkills(updatedSkills);
  };

  return (
    <div className='skillsSection'>
      <h5 className='formSection'>Add your Skills</h5>
      <p className='detailsSubText'>
        Highlight your core strengths and expertise. Create and add skills that
        best suit your position and represent your capabilities, enhancing your
        resume.
      </p>
      <div>
        <input
          className='detailsInfoInput searchDetailsInfoInput'
          type='text'
          placeholder='Create a new skill...'
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
        />
        <button type='button' onClick={handleAddSkill}>
          Add
        </button>
      </div>
      <div>
        <h6 className='formSection SkillsadditionalDetails'>
          Selected Skills:
        </h6>
        {userSkills.map((skill, index) => (
          <div key={index} className='selected-option selectedOption'>
            {skill}
            <button
              type='button'
              onClick={() => handleRemoveSkill(skill)}
              className='DeleteSkill'
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
