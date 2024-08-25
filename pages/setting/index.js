import axios from "@/utils/axios";
import { useEffect, useState } from "react";
import { getBase64 } from "@/utils/file-helper";
import { Toaster } from "@/components/toaster";

export default function Tabs() {
  const [activeTab, setActiveTab] = useState(0);
  const [logo, setLogo] = useState(null);
  const [siteSettingForm, setSiteSettingForm] = useState({
    site_title: "",
    meta_description: "",
    meta_keywords: "",
    logo_url: "",
    favicon_url: "",
    footer_text: "",
  });

  const [socialForm, setSocialForm] = useState({
    facebook: "",
    twitter: "",
    instagram: "",
    linkedin: "",
    youtube: "",
  });
  const [contactForm, setContactForm] = useState({
    primary_phone: "",
    secondary_phone: "",
    primary_email: "",
    secondary_email: "",
    contact_address: "",
    contact_email: "",
    office_hours: "",
    google_maps_embed: "",
  });
  const [missionVision, setMissionVision] = useState({
    mission: "",
    vision: "",
    about_mission_vision: "",
  });

  const [data, setData] = useState({});
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    let res = axios
      .get(`/${"website-setting/1"}`)
      .then((res) => {
        setSiteSettingForm(res.data);
        setContactForm(res.data);
        setSocialForm(res.data);
        setMissionVision(res.data);
      })
      .catch((err) => console.log("err", err));
  };
  console.log("data :>> ", data);
  const handleSiteChange = async (e) => {
    if (e.target.name == "logo_url") {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setLogo(reader.result);
        };
        reader.readAsDataURL(file);
      }
      console.log("file :>> ", file);
      setSiteSettingForm({
        ...siteSettingForm,
        [e.target.name]: logo,
      });
      console.log("siteSettingForm :>> ", siteSettingForm);
    } else {
      setSiteSettingForm({
        ...siteSettingForm,
        [e.target.name]: e.target.value,
      });
    }
  };
  console.log("logo", logo);
  const handleContactChange = (e) => {
    setContactForm({ ...contactForm, [e.target.name]: e.target.value });
  };
  const handleSocialChange = (e) => {
    setSocialForm({ ...socialForm, [e.target.name]: e.target.value });
  };
  const handleMissionVisionChange = (e) => {
    setMissionVision({ ...missionVision, [e.target.name]: e.target.value });
  };

  const handleSiteSubmit = (e) => {
    console.log("siteSettingForm", siteSettingForm);
    siteSettingForm.logo_url = logo;
    axios
      .put("website-setting/1", siteSettingForm)
      .then((res) => Toaster('success',res.message+''))
      .catch((err) => console.log("err :>> ", err));
    e.preventDefault();
    // Handle form submission logic here
  };
  const handleContactSubmit = (e) => {
    e.preventDefault();
    axios
      .put("website-setting/1", contactForm)
      .then((res) => Toaster('success',res.message+''))
      .catch((err) => console.log("err :>> ", err));
    e.preventDefault();
    // Handle form submission logic here
    console.log(siteSettingForm);
    console.log(contactForm);
  };
  const handleSocialSubmit = (e) => {
    e.preventDefault();
    axios
      .put("website-setting/1", socialForm)
      .then((res) => Toaster('success',res.message+''))
      .catch((err) => console.log("err :>> ", err));
    e.preventDefault();
    // Handle form submission logic here
    console.log(siteSettingForm);
    // Handle form submission logic here
    console.log(socialForm);
  };
  const handleMissionVisionSubmit = (e) => {
    e.preventDefault();
    axios
      .put("website-setting/1", missionVision)
      .then((res) => Toaster('success',res.message+''))
      .catch((err) => console.log("err :>> ", err));
    e.preventDefault();
    // Handle form submission logic here
    console.log(siteSettingForm);
    // Handle form submission logic here
    console.log(missionVision);
  };
  const tabs = ["Site Setting", "Contact", "Social", "Mission Vision"];
  const tabContent = [
    <form
      className="  bg-gray-200 p-2 rounded-lg  shadow-lg grid grid-cols-3 gap-3"
      onSubmit={handleSiteSubmit}
    >
      <div>
        <label
          htmlFor="site_title"
          className="block text-sm font-medium text-gray-700"
        >
          Site Title
        </label>
        <input
          type="text"
          name="site_title"
          id="site_title"
          value={siteSettingForm.site_title}
          onChange={handleSiteChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>

      <div>
        <label
          htmlFor="meta_description"
          className="block text-sm font-medium text-gray-700"
        >
          Meta Description
        </label>
        <textarea
          name="meta_description"
          id="meta_description"
          value={siteSettingForm.meta_description}
          onChange={handleSiteChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>

      <div>
        <label
          htmlFor="meta_keywords"
          className="block text-sm font-medium text-gray-700"
        >
          Meta Keywords
        </label>
        <input
          type="text"
          name="meta_keywords"
          id="meta_keywords"
          value={siteSettingForm.meta_keywords}
          onChange={handleSiteChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>

      <div>
        <label
          htmlFor="logo_url"
          className="block text-sm font-medium text-gray-700"
        >
          Logo URL
        </label>
        <input
          type="file"
          name="logo_url"
          id="logo_url"
          // value={siteSettingForm.logo_url}
          onChange={handleSiteChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>

      <div>
        <label
          htmlFor="favicon_url"
          className="block text-sm font-medium text-gray-700"
        >
          Favicon URL
        </label>
        <input
          type="url"
          name="favicon_url"
          id="favicon_url"
          value={siteSettingForm.favicon_url}
          onChange={handleSiteChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>
      <div>
        <label
          htmlFor="footer_text"
          className="block text-sm font-medium text-gray-700"
        >
          Footer Text
        </label>
        <textarea
          name="footer_text"
          id="footer_text"
          value={siteSettingForm.footer_text}
          onChange={handleSiteChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>
      <div className="text-center p-3">
        <button
          type="submit"
          className="  py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Save Settings
        </button>
      </div>
    </form>,

    <form
      className="  bg-gray-200 p-2 rounded-lg  shadow-lg grid grid-cols-3 gap-3"
      onSubmit={handleContactSubmit}
    >
      <div>
        <label
          htmlFor="primary_phone"
          className="block text-sm font-medium text-gray-700"
        >
          Primary Phone
        </label>
        <input
          type="tel"
          name="primary_phone"
          id="primary_phone"
          value={contactForm.primary_phone}
          onChange={handleContactChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>

      <div>
        <label
          htmlFor="secondary_phone"
          className="block text-sm font-medium text-gray-700"
        >
          Secondary Phone
        </label>
        <input
          type="tel"
          name="secondary_phone"
          id="secondary_phone"
          value={contactForm.secondary_phone}
          onChange={handleContactChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>

      <div>
        <label
          htmlFor="primary_email"
          className="block text-sm font-medium text-gray-700"
        >
          Primary Email
        </label>
        <input
          type="email"
          name="primary_email"
          id="primary_email"
          value={contactForm.primary_email}
          onChange={handleContactChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>

      <div>
        <label
          htmlFor="secondary_email"
          className="block text-sm font-medium text-gray-700"
        >
          Secondary Email
        </label>
        <input
          type="email"
          name="secondary_email"
          id="secondary_email"
          value={contactForm.secondary_email}
          onChange={handleContactChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>

      <div>
        <label
          htmlFor="contact_address"
          className="block text-sm font-medium text-gray-700"
        >
          Contact Address
        </label>
        <textarea
          name="contact_address"
          id="contact_address"
          value={contactForm.contact_address}
          onChange={handleContactChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>

      <div>
        <label
          htmlFor="contact_email"
          className="block text-sm font-medium text-gray-700"
        >
          Contact Email
        </label>
        <input
          type="email"
          name="contact_email"
          id="contact_email"
          value={contactForm.contact_email}
          onChange={handleContactChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>

      <div>
        <label
          htmlFor="office_hours"
          className="block text-sm font-medium text-gray-700"
        >
          Office Hours
        </label>
        <input
          type="text"
          name="office_hours"
          id="office_hours"
          value={contactForm.office_hours}
          onChange={handleContactChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>
      <div>
        <label
          htmlFor="google_maps_embed"
          className="block text-sm font-medium text-gray-700"
        >
          Google Maps Embed
        </label>
        <textarea
          name="google_maps_embed"
          id="google_maps_embed"
          value={contactForm.google_maps_embed}
          onChange={handleContactChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>
      <div className="text-center p-3">
        <button
          type="submit"
          className="  py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Save Settings
        </button>
      </div>
    </form>,
    <form
      onSubmit={handleSocialSubmit}
      className="  bg-gray-200 p-2 rounded-lg  shadow-lg grid grid-cols-3 gap-3"
      // className="max-w-xl mx-auto p-4 bg-white shadow-md rounded-md space-y-4"
    >
      <div>
        <label
          htmlFor="facebook"
          className="block text-sm font-medium text-gray-700"
        >
          Facebook
        </label>
        <input
          type="url"
          name="facebook"
          id="facebook"
          value={socialForm.facebook}
          onChange={handleSocialChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>

      <div>
        <label
          htmlFor="twitter"
          className="block text-sm font-medium text-gray-700"
        >
          Twitter
        </label>
        <input
          type="url"
          name="twitter"
          id="twitter"
          value={socialForm.twitter}
          onChange={handleSocialChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>

      <div>
        <label
          htmlFor="instagram"
          className="block text-sm font-medium text-gray-700"
        >
          Instagram
        </label>
        <input
          type="url"
          name="instagram"
          id="instagram"
          value={socialForm.instagram}
          onChange={handleSocialChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>

      <div>
        <label
          htmlFor="linkedin"
          className="block text-sm font-medium text-gray-700"
        >
          LinkedIn
        </label>
        <input
          type="url"
          name="linkedin"
          id="linkedin"
          value={socialForm.linkedin}
          onChange={handleSocialChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>

      <div>
        <label
          htmlFor="youtube"
          className="block text-sm font-medium text-gray-700"
        >
          YouTube
        </label>
        <input
          type="url"
          name="youtube"
          id="youtube"
          value={socialForm.youtube}
          onChange={handleSocialChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>

      <div className="text-center p-3">
        <button
          type="submit"
          className="  py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Save Settings
        </button>
      </div>
    </form>,
    <form
      onSubmit={handleMissionVisionSubmit}
      className="  bg-gray-200 p-2 rounded-lg  shadow-lg grid grid-cols-3 gap-3"
      // className="max-w-xl mx-auto p-4 bg-white shadow-md rounded-md space-y-4"
    >
      <div>
        <label
          htmlFor="about_mission_vision"
          className="block text-sm font-medium text-gray-700"
        >
          About
        </label>
        <textarea
          type="url"
          name="about_mission_vision"
          id="about_mission_vision"
          value={missionVision.about_mission_vision}
          onChange={handleMissionVisionChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>
      <div>
        <label
          htmlFor="about_mission_vision"
          className="block text-sm font-medium text-gray-700"
        >
          Mission
        </label>
        <textarea
          type="url"
          name="mission"
          id="mission"
          value={missionVision.mission}
          onChange={handleMissionVisionChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>
      <div>
        <label
          htmlFor="vision"
          className="block text-sm font-medium text-gray-700"
        >
          Vision
        </label>
        <textarea
          type="url"
          name="vision"
          id="vision"
          value={missionVision.vision}
          onChange={handleMissionVisionChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>

      <div className="text-center p-3">
        <button
          type="submit"
          className="  py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Save Settings
        </button>
      </div>
    </form>,
  ];

  return (
    <div className="w-full  mx-auto mt-10">
      <div className="flex border-b border-gray-300">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`flex-1 text-center py-2 ${
              activeTab === index
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab(index)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="p-4">{tabContent[activeTab]}</div>
    </div>
  );
}
