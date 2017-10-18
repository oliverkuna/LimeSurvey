import _ from 'lodash';

const globalTourObject = function(){
    const getBasedUrls = (/index\.php\/?\?r=admin/.test(window.location.href)),
    
        combineParams = function(params){
            const getBasedUrls = false;
            if(params === false) return '';

            const returner = (getBasedUrls ? '?' :'/') + _.reduce(params, (urlParams, value, key)=>{ 
                return urlParams + (
                    getBasedUrls ? 
                        (urlParams === '' ? '' : '&')+key+'='+value 
                        : (urlParams === '' ? '' : '/')+key+'/'+value
                );
            }, '');
            return returner;
        },
        filterUrl = function(url,params=false){
            if(url.charAt(0) == '/')
                url = url.substring(1);
            
            const baseUrl = getBasedUrls ? '/index.php?r=admin/' : '/index.php/admin/';
            
            const returnUrl = baseUrl+url+combineParams(params);

            return returnUrl;

        };

    const prebuiltTours = {
        firstStartTour: {
            name: 'firstStartTour',
            steps: [
                { //1
                    element: '#lime-logo',
                    orphan: true,
                    backdrop: true,
                    path: filterUrl('index'),
                    container: '#in_survey_common_action',
                    title: 'Welcome to LimeSurvey!',
                    placement: 'bottom',
                    content: `<p>This tour will help you get a hold of LimeSurvey.</p>
                    <p>We know that LimeSurvey may be hard to use at the beginning, that's why we would like to help with a quick tour through the most essential functions and features</p>
                    `,                    
                    redirect:  false

                },
                { //2
                    element: '.selector__lstour--mainfunctionboxes',
                    path: filterUrl('index'),
                    title: 'The basic functions',
                    content: `The three top boxes are the most basic functions of LimeSurvey.
                    <p>From left to right it should be "Create survey", "List surveys" and "Global settings"
                    At best we start by creating a survey.</p>
                    <p>Click on Create survey or Next in this box</p>`,
                    reflex: '.selector__lstour--createsurvey',
                    backdrop: true,
                    redirect: false 
                },
                { //3
                    element: '#surveyls_title',
                    path: filterUrl('survey/sa/newsurvey'),
                    title: 'The survey title',
                    content: `This is the title of your survey.
                    <p>Your participants will see this title as well in the browsers titlebar, als also on the welcome screen.</p>
                    <p>You have to put in at least a title for the survey to be saved.</p>
                    <p class="bg-info alert"><b>Tip:</b> Make your surveys shine with a meaningful title</p>`,
                    redirect:  true
                },
                { //4
                    element: '#cke_description',
                    path: filterUrl('survey/sa/newsurvey'),
                    title: 'The survey description',
                    placement: 'top',
                    content: `<p>This is the description of the survey.</p>
                    <p>Your participants will see this at first on their welcome screen.
                    Try to describe what your survey is about, but don't ask any qustion, yet.</p>`,
                    redirect: false 
                },
                { //5
                    element: '.bootstrap-switch-id-createsample',
                    path: filterUrl('survey/sa/newsurvey'),
                    title: 'Create a sample question and question group',
                    content: 'In this tutorial we will be creating a questiongroup and a question, so no need to automatically create it.',
                    redirect: false 
                },
                { //6
                    element: '#cke_welcome',
                    path: filterUrl('survey/sa/newsurvey'),
                    title: 'The welcome message',
                    placement: 'top',
                    content: `<p>This message is shown directly under the survey description on the welcome page.
                    You may leave this blank and concentrate on a good text for your description, or vice versa.</p>`,
                    redirect: false 
                },
                { //7
                    element: '#cke_endtext',
                    path: filterUrl('survey/sa/newsurvey'),
                    title: 'The end message',
                    placement: 'top',
                    content: `<p>This message is shown at the end of your survey to every participant.
                    It's a great way to say thank you, or to give some links or hints where to go next.</p>`,
                    redirect: false 
                },
                { //8
                    element: '#save-form-button',
                    path: filterUrl('survey/sa/newsurvey'),
                    title: 'Thats it for now',
                    placement: 'bottom',
                    content: `<p>You may play around with more settings, or just get to editing your survey now.
                    Just click on save.</p>`,
                    reflex: true,
                    onNext(tour){ 
                        $('#save-form-button').trigger('click');
                        return Promise.resolve(tour);
                    },
                    redirect: false 
                },
                { //9
                    element: '#sidebar',
                    path: RegExp(filterUrl('/admin/survey/sa/view', {'surveyid' : '[0-9]{4,25}'})),
                    placement: 'right',
                    backdrop: true,
                    title: 'The sidebar',
                    content: `<p>This is the sidebar.</p>
                    <p>All important settings can be reached in this sidebar.</p>
                    <p>You may resize it to fit on your screen, or make it bigger to better control your surveystructure.
                    It may be collapsed to show the quick-menu. To collapse it either click on the arrow button or resize it to the left.</p>`,
                    redirect:  false,
                    onShow: (tour)=>{
                        return new Promise((res)=>{
                            res(tour);
                        });
                    }
                },
                { //10
                    element: '#adminpanel__sidebar--selectorSettingsButton',
                    path: RegExp(filterUrl('/admin/survey/sa/view', {'surveyid' : '[0-9]{4,25}'})),
                    backdrop: true,
                    placement: 'bottom',
                    title: 'The settings tab with the surveymenu',
                    content: `<p>This tab shows the surveysettings.</p>
                    <p>Any setting to your survey can be reached through this menu.
                    If you want to know more about the settings, have a look at our manual.</p>`,
                    redirect: false 
                },
                { //11
                    element: '#surveybarid',
                    path: RegExp(filterUrl('/admin/survey/sa/view', {'surveyid' : '[0-9]{4,25}'})),
                    backdrop: true,
                    placement: 'bottom',
                    title: 'The top-bar',
                    content: `<p>This is the top bar.</p>
                    <p>This bar will change, as you move through the functionalities. 
                    In this view it contains the most important LimeSurvey functionalities, like activating and previewing the survey</p>
                    <p>An advanced user may even create custom menues and entries here.</p>`,
                    redirect: false 
                },
                { //12
                    element: '#adminpanel__sidebar--selectorStructureButton',
                    path: RegExp(filterUrl('/admin/survey/sa/view', {'surveyid' : '[0-9]{4,25}'})),
                    backdrop: true,
                    placement: 'bottom',
                    title: 'The surveystructure',
                    content: `<p>This is the structure view of your survey.</p>
                    <p>Here you can see all your questiongroups and questions.</p>`,
                    onShow(tour){
                        $('#adminpanel__sidebar--selectorStructureButton').trigger('click');
                        return Promise.resolve(tour);
                    },
                    redirect: false 
                    
                },
                { //13
                    element: '#adminpanel__sidebar--selectorCreateQuestionGroup',
                    path: RegExp(filterUrl('/admin/survey/sa/view', {'surveyid': '[0-9]{4,25}', 'gid':'[0-9]{1,25}', 'qid': '[0-9]{4,25}'})),
                    placement: 'right',
                    title: 'Let\'s add another questiongroup',
                    content: '<p>Click on the add questiongroup button</p>',
                    reflex: true,
                    onNext(tour){ 
                        $('#adminpanel__sidebar--selectorCreateQuestionGroup').trigger('click');
                        return Promise.resolve(tour);
                    },
                    redirect: false 
                },
                { //14
                    element: '#group_name_en',
                    path: RegExp(filterUrl('/admin/questiongroups/sa/add', {'surveyid': '[0-9]{4,25}'})),
                    placement: 'bottom',
                    title: 'Put in the title to your question group',
                    content: `<p>The title will be visible to your participants and cannot be empty</p>
                    <p>Questiongroups are important to logically divide your questions, also in the default setting your survey is shown questiongroupwise.</p>`,
                    redirect: false                    
                },
                { //15
                    element: 'label[for=description_en]',
                    path: RegExp(filterUrl('/admin/questiongroups/sa/add', {'surveyid': '[0-9]{4,25}'})),
                    placement: 'top',
                    title: 'A description for your questiongroup',
                    content: `<p>This description is also visible to your participants.</p>
                    <p>You do not need to add a description to your questiongroup, but sometimes it makes sense to add a little extra information for your participants.</p>`,
                    redirect: false 
                },
                { //16
                    element: '#randomization_group',
                    path: RegExp(filterUrl('/admin/questiongroups/sa/add', {'surveyid': '[0-9]{4,25}'})),
                    placement: 'left',
                    title: 'Advanced settings',
                    content: `<p>Best to leave them like they are.</p>
                    <p>If you want to know more about randomization and relevance settings have a look at our manual.</p>`,
                    redirect: false 
                },
                { //17
                    element: '#save-and-new-question-button',
                    path: RegExp(filterUrl('/admin/questiongroups/sa/add', {'surveyid': '[0-9]{4,25}'})),
                    placement: 'bottom',
                    title: 'Save and add a new question',
                    content: `<p>Now when you are finished click on 'Save and add question'.</p>
                    <p>This will directly go to the form to add a question to the current questiongroup.</p>`,
                    reflex: true,
                    onNext(tour){ 
                        $('#save-and-new-question-button').trigger('click');
                        return Promise.resolve(tour);
                    },
                    redirect: false 
                },
                { //18
                    element: '#title',
                    path: RegExp(filterUrl('admin/questions/sa/newquestion', {'surveyid': '[0-9]{4,25}', 'gid': '[0-9]{1,25}'})),
                    placement: 'top',
                    title: 'The title of your question.',
                    content: `<p>This title is normally not shown to your participants, still it is absolutely necessary and has to be unique for the survey.</p>
                    <p>The code may consist only of letters and numbers, but cannot start with a number.</p>
                    <p>The code is also the name of the variable that will be exported to SPSS or Excel.</p>`,
                    redirect: false
                },
                { //19
                    element: '#cke_question_en',
                    path: RegExp(filterUrl('admin/questions/sa/newquestion', {'surveyid': '[0-9]{4,25}', 'gid': '[0-9]{1,25}'})),
                    placement: 'top',
                    title: 'The actual question text.',
                    content: `<p>The content of this box is the actual question text shown to your participants.</p>
                    <p>It may be empty, but that is not recommended. You may use all the power of our WYSIWIG editor to make your question shine.</p>`,
                    redirect: false 
                },
                { //20
                    element: '#cke_help_en',
                    path: RegExp(filterUrl('admin/questions/sa/newquestion', {'surveyid': '[0-9]{4,25}', 'gid': '[0-9]{1,25}'})),
                    placement: 'top',
                    title: 'An additional help text for your question.',
                    content: `<p>You can add some additional helptext to your question.</p>
                    <p>This may also be empty, then nothing of it will be shown.</p>`,
                    redirect: false 
                },
                {  //21
                    element: '#questionTypeContainer',
                    path: RegExp(filterUrl('admin/questions/sa/newquestion', {'surveyid': '[0-9]{4,25}', 'gid': '[0-9]{1,25}'})),
                    backdrop: true,
                    placement: 'left',
                    title: 'Set your questions type.',
                    content: `<p>LimeSurvey offers you a lot of different question types.</p>
                    <p>The example question created for you as well as the deault setting is the 'Long free text'-type.
                    This type will create a big text input for your participants.</p>
                    <p class="alert bg-success"><b>Please select the 'Array'-type.</b></p>`,
                    redirect: false 
                },
                { //22
                    element: '#save-button',
                    path: RegExp(filterUrl('admin/questions/sa/newquestion', {'surveyid': '[0-9]{4,25}', 'gid': '[0-9]{1,25}'})),
                    placement: 'bottom',
                    title: 'Now save the created question',
                    content: `<p>Next we will create subquestions and answer options.</p>
                    <p>Please be sure to fill in a legal title with only letters and numbers starting with a letter.</p>`,
                    reflex: true,
                    onNext(tour){ 
                        $('#save-button').trigger('click');
                        return Promise.resolve(tour);
                    },
                    redirect: false 
                },
                { //23
                    element: '#questionbarid',
                    path: RegExp(filterUrl('/admin/survey/sa/view', {'surveyid': '[0-9]{4,25}', 'gid':'[0-9]{1,25}', 'qid': '[0-9]{4,25}'})),
                    backdrop: true,
                    placement: 'bottom',
                    title: 'The question bar',
                    content: `<p>This is the question bar.</p>
                    <p> The most important option here is the edit button. Also important are the preview buttons, which we will show in on of the next steps.</p>`,
                    redirect:  false
                },
                { //24
                    element: '#adminpanel__topbar--selectorAddSubquestions',
                    path: RegExp(filterUrl('/admin/survey/sa/view', {'surveyid': '[0-9]{4,25}', 'gid':'[0-9]{1,25}', 'qid': '[0-9]{4,25}'})),
                    placement: 'bottom',
                    title: 'Add some subquestions to your question',
                    content: `<p>The array question is a question that creates a matrix for the participant.</p>
                    <p>To fully use it you have to add subquestions as well as answer options.</p>
                    <p>Let's start with subquestions.</p>`,
                    reflex: true,
                    onNext(tour){ 
                        document.location.href = $('#adminpanel__topbar--selectorAddSubquestions').attr('href');
                        return Promise.resolve(tour);
                    },
                    redirect: false
                },
                { //25
                    element: '#rowcontainer',
                    path: RegExp(filterUrl('admin/questions/sa/subquestions/surveyid/[0-9]{4,25}/gid/[0-9]{1,25}/qid/[0-9]{4,25}')),
                    placement: 'top',
                    title: 'Edit subquestions',
                    content: `<p>Here you may add some subquestions for your question.</p>
                    <p>Every row is one subquestion. It's best practice to use logical, or numerical codes for the subquestions.
                    Your participants cannot see the subquestion code, only the text, filled into the field titled 'Subquestion'</p>
                    <p class="bg-info alert">Pro Tip: The subquestion may contain HTML-code if you are logged in in admin mode.</p>`,
                    redirect: false
                },
                { //26
                    element: '#rowcontainer>tr:first-of-type .btnaddanswer',
                    path: RegExp(filterUrl('admin/questions/sa/subquestions/surveyid/[0-9]{4,25}/gid/[0-9]{1,25}/qid/[0-9]{4,25}')),
                    placement: 'top',
                    title: 'Add subquestion row',
                    content: `<p>Click on this little plus to add another subquestion to your question.</p>
                    <p>You can do this as often as you want, or need.</p>`,
                    redirect: false 
                },
                { //27
                    element: '#save-button',
                    path: RegExp(filterUrl('admin/questions/sa/subquestions/surveyid/[0-9]{4,25}/gid/[0-9]{1,25}/qid/[0-9]{4,25}')),
                    placement: 'bottom',
                    title: 'Now save the subquestions',
                    content: `<p>You may save empty subquestions, but that would not be of any use.</p>
                    <p>Save now and let's edit answer options.</p>`,
                    reflex: true,
                    redirect: false,
                    onNext(tour){ 
                        $('#save-button').trigger('click');
                        return Promise.resolve(tour);
                    }                 
                },
                { //28
                    element: '#adminpanel__topbar--selectorAddAnswerOptions',
                    path: RegExp(filterUrl('/admin/survey/sa/view', {'surveyid': '[0-9]{4,25}', 'gid':'[0-9]{1,25}', 'qid': '[0-9]{4,25}'})),
                    placement: 'bottom',
                    title: 'Add some answer options to your question',
                    content: `<p>Now that we've got some subquestions we have to add answer options as well</p>
                    <p>The answer options will define the values, that your subquestions represent.</p>`,
                    reflex: true,
                    redirect: false,
                    onNext(tour){ 
                        document.location.href = $('#adminpanel__topbar--selectorAddAnswerOptions').attr('href');
                        return Promise.resolve(tour);
                    },
                },
                { //28
                    element: '#rowcontainer',
                    path: RegExp(filterUrl('admin/questions/sa/answeroptions/surveyid/[0-9]{4,25}/gid/[0-9]{1,25}/qid/[0-9]{4,25}')),
                    placement: 'top',
                    title: 'Edit answer options',
                    content: `<p>As you can see, answer options and subquestions really don't differ so much.</p>
                    <p>Just proceed and add as many answer options as you like.</p>`,
                    redirect: false 
                },
                { //30
                    element: '#save-button',
                    path: RegExp(filterUrl('admin/questions/sa/subquestions/surveyid/[0-9]{4,25}/gid/[0-9]{1,25}/qid/[0-9]{4,25}')),
                    placement: 'bottom',
                    title: 'Now save the answer options',
                    content: '<p>Click on save or next to proceed</p>',
                    reflex: true,
                    onNext(tour){ 
                        $('#save-button').trigger('click');
                        return Promise.resolve(tour);
                    },
                    redirect: false               
                },
                { //31
                    element: '.selector__topbar--previewSurvey',
                    path: RegExp(filterUrl('/admin/survey/sa/view', {'surveyid': '[0-9]{4,25}', 'gid':'[0-9]{1,25}', 'qid': '[0-9]{4,25}'})),
                    placement: 'bottom',
                    title: 'Preview survey',
                    content: `<p>Now is the time to preview your first survey.</p>
                    <p>Just click on this button and a new window will open, where you can test run your survey. 
                    Please be aware, that your answers will not be saved, because the survey isn't active, yet.
                    Return to this window, when you are done testing.</p>`,
                    redirect: false      
                },
                { //32
                    element: '#breadcrumb-container',
                    path: RegExp(filterUrl('/admin/survey/sa/view', {'surveyid': '[0-9]{4,25}', 'gid':'[0-9]{1,25}', 'qid': '[0-9]{4,25}'})),
                    backdrop: true,
                    placement: 'bottom',
                    title: 'Easy navigation with the breadcrumbs',
                    content: `<p>On the top bar of the adminview you see the breadcrumbs.</p>
                    <p>These will always be an easy way to get back to any setting before.
                    Click on the name of your survey to get back to the survey settings overview.</p>`,
                    reflex: true,
                    onNext(tour){ 
                        $('#breadcrumb__survey--overview').trigger('click');
                        return Promise.resolve(tour);
                    },
                    redirect: false     
                },
                { //33
                    element: '#ls-activate-survey',
                    path: RegExp(filterUrl('/admin/questiongroups/sa/add', {'surveyid': '[0-9]{4,25}'})),
                    backdrop: true,
                    placement: 'bottom',
                    title: 'Finally activate your survey',
                    content: `<p>Now activate this simple survey.</p>
                    <p>You can have as many surveys as you like, so don't worry for the number of survey.
                    Just share the link with one or two friends to get some results you can test in the statistics.</p>`,
                    reflex: true,
                    redirect: false
                },
                { //34
                    element: '#activateSurvey__basicSettings--proceed',
                    path: RegExp(filterUrl('/admin/survey/sa/activate/', {'surveyid': '[0-9]{4,25}'})),
                    backdrop: false,
                    placement: 'bottom',
                    title:'Activation settings',
                    content: `<p>These settings cannot be changed, once the survey is online.</p>
                    <p>For this simple survey the default settings are ok like this, but read the disclaimer carefully when you activate your own surveys.</p>
                    <p>For more information consult or manual, or our forum.</p>`,
                    reflex: true,
                    redirect: false
                },
                { //35
                    element: '#activateTokenTable__selector--no',
                    path: '',
                    backdrop: false,
                    placement: 'bottom',
                    title:'Activate token table',
                    content: `<p>Here you can select to start your survey in closed access mode.</p>
                    <p>For our simple survey it is better to start in open access mode.</p>
                    <p>The closed access mode needs a participant list, which you may create by clicking on the menu entry 'Participant tokens'.
                    For more information please consult our manual, or our forum.</p>`,
                    reflex: true,
                    redirect: false
                }
            ],
            debug: true,
            orphan: true,
            keyboard: false
        }
    };

    return {
        get : function(tourName){
            return new Promise((res)=>{
                if(prebuiltTours[tourName] != undefined){
                    res(prebuiltTours[tourName]);
                } else {
                    //here is the ajax loading to do
                }
            });
        }
    };

};

export default globalTourObject();
