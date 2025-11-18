import React, { useEffect } from "react";

const DynamicReservationModal = ({ isOpen, onClose, config }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !config || !config.zohoForm) return null;

  const { zohoForm } = config;
  const isPMPForm = config.id === 'pmp';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-3 sm:px-4">
      <div className="relative w-full max-w-sm sm:max-w-lg rounded-2xl bg-white dark:bg-gray-900 p-4 sm:p-6 shadow-xl max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 text-lg sm:text-xl z-10"
        >
          ✕
        </button>

        <div className="mb-4 sm:mb-6 flex justify-center">
          <img
            src="https://theduocean.com/assets/theeduoceanlogo-BSIZdgZ3.png"
            alt="Company Logo"
            className="h-10 w-auto sm:h-14 object-contain"
          />
        </div>

        <h2 className="mb-2 text-center text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100">
          Reserve Your Free Seat
        </h2>
        <p className="mb-4 sm:mb-6 text-center text-sm sm:text-base text-gray-600 dark:text-gray-300">
          Fill in your details to register for the {config.shortTitle}
        </p>

        <form 
          action={zohoForm.action}
          name={zohoForm.formName}
          method='POST' 
          onSubmit={(e) => {
            const form = e.target;
            const checkFunction = window[`checkMandatory${zohoForm.formName.replace('WebForm', '')}`];
            if (checkFunction && !checkFunction()) {
              e.preventDefault();
              return false;
            }
            document.charset = "UTF-8";
            return true;
          }}
          acceptCharset='UTF-8'
          className="space-y-3 sm:space-y-4"
        >
          <input type='text' style={{display: 'none'}} name='xnQsjsdp' value={zohoForm.fields.xnQsjsdp} /> 
          <input type='hidden' name='zc_gad' id='zc_gad' value='' /> 
          <input type='text' style={{display: 'none'}} name='xmIwtLD' value={zohoForm.fields.xmIwtLD} /> 
          <input type='text' style={{display: 'none'}} name='actionType' value={zohoForm.fields.actionType} /> 
          <input type='text' style={{display: 'none'}} name='returnURL' value={zohoForm.fields.returnURL} /> 
          <input type='text' style={{display: 'none'}} name='sysId' value={zohoForm.fields.sysId} /> 
          <input type='text' style={{display: 'none'}} name='isEmbedForm' value='true' />

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Time zone
            </label>
            <select 
              id='timezone' 
              name='timezone' 
              className="mt-1 w-full rounded-lg border border-gray-300 p-2.5 sm:p-3 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 text-sm sm:text-base"
            >
              <option value='Asia/Kolkata'>( GMT +05:30 ) India Standard Time</option>
              <option value='Asia/Dubai'>( GMT +04:00 ) Gulf Standard Time (UAE)</option>
              <option value='America/New_York'>( GMT -05:00 ) Eastern Standard Time (US)</option>
              <option value='America/Chicago'>( GMT -06:00 ) Central Standard Time (US)</option>
              <option value='America/Los_Angeles'>( GMT -08:00 ) Pacific Standard Time (US)</option>
              <option value='Europe/London'>( GMT +00:00 ) Greenwich Mean Time (UK)</option>
              <option value='Asia/Singapore'>( GMT +08:00 ) Singapore Standard Time</option>
              <option value='Australia/Sydney'>( GMT +11:00 ) Australian Eastern Time</option>
            </select>
          </div>

          {isPMPForm ? (
            // PMP Form Fields
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input 
                  type='text' 
                  name='NAME'
                  maxLength='40'
                  className="mt-1 w-full rounded-lg border border-gray-300 p-2.5 sm:p-3 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 text-sm sm:text-base"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  Email <span className="text-red-500">*</span>
                </label>
                <input 
                  type='text' 
                  name='EMAIL'
                  maxLength='251'
                  className="mt-1 w-full rounded-lg border border-gray-300 p-2.5 sm:p-3 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 text-sm sm:text-base"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  Country/Region <span className="text-red-500">*</span>
                </label>
                <select 
                  name='REGISTRATIONCF4' 
                  className="mt-1 w-full rounded-lg border border-gray-300 p-2.5 sm:p-3 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 text-sm sm:text-base"
                >
                  <option value="">None</option>
                  <option value='1280205000000004136'>India</option>
                  <option value='1280205000000004404'>United Arab Emirates</option>
                  <option value='1280205000000004408'>United States</option>
                  <option value='1280205000000004406'>United Kingdom</option>
                  <option value='1280205000000004014'>Canada</option>
                  <option value='1280205000000003960'>Australia</option>
                  <option value='1280205000000004330'>Singapore</option>
                  <option value='1280205000000004098'>Germany</option>
                  <option value='1280205000000004084'>France</option>
                  <option value='1280205000000004196'>Malaysia</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  Phone <span className="text-red-500">*</span>
                </label>
                <input 
                  type='text' 
                  name='REGISTRATIONCF7'
                  maxLength='100'
                  className="mt-1 w-full rounded-lg border border-gray-300 p-2.5 sm:p-3 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 text-sm sm:text-base"
                  placeholder="Enter your contact number"
                />
              </div>
            </>
          ) : (
            // CISSP and other forms (First Name, Last Name, Email)
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input 
                  type='text' 
                  name='NAME'
                  maxLength='40'
                  className="mt-1 w-full rounded-lg border border-gray-300 p-2.5 sm:p-3 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 text-sm sm:text-base"
                  placeholder="Enter your first name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input 
                  type='text' 
                  name='REGISTRATIONCF1'
                  maxLength='100'
                  className="mt-1 w-full rounded-lg border border-gray-300 p-2.5 sm:p-3 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 text-sm sm:text-base"
                  placeholder="Enter your last name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  Email <span className="text-red-500">*</span>
                </label>
                <input 
                  type='text' 
                  name='EMAIL'
                  maxLength='251'
                  className="mt-1 w-full rounded-lg border border-gray-300 p-2.5 sm:p-3 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 text-sm sm:text-base"
                  placeholder="Enter your email"
                />
              </div>
            </>
          )}

          <button
            type='submit'
            className="w-full rounded-lg bg-blue-600 py-2.5 sm:py-3 text-white font-medium shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base"
          >
            Submit
          </button>
        </form>
      </div>
      
      <script dangerouslySetInnerHTML={{__html: `
        var mndFileds=new Array(${zohoForm.mandatoryFields.map(f => `'${f}'`).join(',')});
        var fldLangVal=new Array(${zohoForm.fieldLabels.map(l => `'${l}'`).join(',')});
        
        function checkMandatory${zohoForm.formName.replace('WebForm', '')}(){
          var emailPattern = /^([^\\s@<>]{1,200})@([^\\s@<>]{1,300})$/; 
          for(i=0;i<mndFileds.length;i++){ 
            var fieldObj=document.forms['${zohoForm.formName}'][mndFileds[i]];
            if(fieldObj) {
              if(((fieldObj.value).replace(/^\\s+|\\s+$/g, '')).length==0){
                alert(fldLangVal[i] +' cannot be empty.'); 
                fieldObj.focus(); 
                return false;
              }else if(fieldObj.nodeName=='SELECT'){
                if(fieldObj.options[fieldObj.selectedIndex].value=='-None-'){
                  alert(fldLangVal[i] +' cannot be none.'); 
                  fieldObj.focus(); 
                  return false;
                }
              } else if(fieldObj.type =='checkbox'){ 
                if (fieldObj.checked == false){     
                  alert('Please accept  '+fldLangVal[i]); 
                  fieldObj.focus();
                  return false;
                }
              } else if(mndFileds[i] == 'EMAIL' && fieldObj.value && !(emailPattern.test(fieldObj.value))) { 
                alert('Please enter a valid email address.');
                fieldObj.focus(); 
                return false; 
              } 
              if(fieldObj.type == 'text') { 
                fieldObj.value = fieldObj.value.trim(); 
              }
            }
          }
          return true;
        }
        window.checkMandatory${zohoForm.formName.replace('WebForm', '')} = checkMandatory${zohoForm.formName.replace('WebForm', '')};
      `}} />
    </div>
  );
};

export default DynamicReservationModal;
