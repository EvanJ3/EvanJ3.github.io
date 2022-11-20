var EducationTimelineSection = document.getElementById('education-timeline');
var WorkTimelineSection = document.getElementById('work-timeline');

EducationTimelineSection.innerHTML = `
<div class="center-fluid-container" style="justify-content: center; flex-direction: column;">
    <div class="content-center-container" id="timeline-container">
        <h2 style="text-decoration: underline;">Education</h2>
        <div class="timeline-entry"> 
            <div class="timeline-lead">
                <h3>Undergraduate Student</h3>
                <p>August 2015 - May 2019</p>
            </div>
            <div class="timeline-school-icon">
                <a target="_blank" rel="noopener noreferrer" href='https://www.uga.edu/'><img  src="images/Resume_Images/uga_small.png" style="width: 50px;height: auto;"></a>
            </div>
            <div class="timeline-content">
                <h3>  The University of Georgia <span class="location-text"> Athens, GA</span></h3>
                <p>Bachelor of Business Administration in Finance
                    <br>
                    <br>
                    Specialization in Security Pricing &amp; Valuation
                    <br>
                    <br>
                    3.76 GPA
                    <br>
                    <br>
                    <a class="course-work-link" href="pdf/Coursework_pdfs/UGA Course Descirptions.pdf" target="_blank" rel="noopener noreferrer"><button class="course-work-button">Coursework</button></a>                                
                </p>
                
            </div>
        </div>
        <div class="timeline-seperator"></div>
        <div class="timeline-entry"> 
            <div class="timeline-lead">
                <h3>Graduate Student</h3>
                <p>August 2019 - May 2021</p>
            </div>
            <div class="timeline-school-icon">
                <a target="_blank" rel="noopener noreferrer" href='https://www.gatech.edu/' ><img src="images/Resume_Images/gt_small.png" style="width: 50px;height: auto;"></a>
            </div>
            <div class="timeline-content">
                <h3>  Georgia Institute of Technology <span class="location-text"> Atlanta, GA</span></h3>
                <p>Masters of Science in Analytics
                    <br>
                    <br>
                    Specialization in Computational Statistics
                    <br>
                    <br>
                    4.0 GPA
                    <br>
                    <br>
                    <a class="course-work-link" href="pdf/Coursework_pdfs/Georgia Tech Course Descriptions.pdf" target="_blank" rel="noopener noreferrer" ><button class="course-work-button">Coursework</button></a>
                </p>
            </div>
        </div>
    </div>
</div>
`

WorkTimelineSection.innerHTML = `
<div class="center-fluid-container" style="justify-content: center; flex-direction: column;">
    <div class="content-center-container" id="timeline-container">
        <h2 style="text-decoration: underline;">Work Experience</h2>
        <div class="timeline-entry"> 
            <div class="timeline-lead">
                <h3>Data Scientist</h3>
                <p>June 2022 - Present</p>
            </div>
            <div class="timeline-school-icon">
                <a target="_blank" rel="noopener noreferrer" href='https://www.flexshopper.com/' ><img src="images/Resume_Images/Flexshopper.jpg" style="width: 50px;height: auto;"></a>
            </div>
            <div class="timeline-content">
                <h3>FlexShopper<span class="location-text"> Boca Raton, FL</span></h3>
                <p> Led developement team of the company's next generation of credit approval model. 
                    <br>
                    <br>
                    Researched and developed proprietary undersampling and oversampling methods utilizing maximal margin classification properties as a driver of class seperation.
                    <br>
                    <br>
                    Responsible for the modeling and selection of direct mail and social media campagins generating in excess of $20MM in incremental revenue.
                    <br>
                    <br>
                </p>
            </div>
        </div>
        <div class="timeline-seperator"></div>
        <div class="timeline-entry"> 
            <div class="timeline-lead">
                <h3>Graduate Practicum Student</h3>
                <p>January 2022 - May 2022</p>
            </div>
            <div class="timeline-school-icon">
                <a target="_blank" rel="noopener noreferrer" href='https://www.teamusa.org/' ><img src="images/Resume_Images/USOC_Logo.png" style="width: 50px;height: auto;"></a>
            </div>
            <div class="timeline-content">
                <h3>United States Olympic Committee <span class="location-text"> Colorado Springs,CO</span></h3>
                <p>Worked on a modeling and analysis project to improve committee understanding of various drivers of medal achievement in Olympic level athletes/competition
                    <br>
                    <br>
                    Utilized kernel density estimation modeling to develop a novel analysis of the impact age and regulation changes have on alpine skiing disciplines
                    <br>
                    <br>
                    Successfully implemented a variety of regression, tree-based, and neural network models for the task of medal score prediction given a country’s Olympic pipeline
                    <br>
                    <br>
                    Developed a web application based on Python and Plotly-Dash to serve as an interactive dashboard for continued use and analysis of alpine skiing disciplines
                    <br>
                    <br>
                    Created a data scraping, aggregation, and reconciliation tool that automates the process of identifying, retrieving, and matching previously unavailable or inconsistent athlete information from the web
                </p>
            </div>
        </div>
        <div class="timeline-seperator"></div>
        <div class="timeline-entry"> 
            <div class="timeline-lead">
                <h3>Lead Graduate TA</h3>
                <p>October 2021 - Present</p>
            </div>
            <div class="timeline-school-icon">
                <a target="_blank" rel="noopener noreferrer" href='https://www.gatech.edu/' ><img src="images/Resume_Images/gt_small.png" style="width: 50px;height: auto;"></a>
            </div>
            <div class="timeline-content">
                <h3>Georgia Institute of Technology <span class="location-text"> Atlanta, GA</span></h3>
                <p>Serve as the head TA for the master’s level sections of Data Analytics in Business
                    <br>
                    <br>
                    Responsible for the management of MGT 6203: Data Analytics in Business course offered to masters level CS & Analytics students
                    <br>
                    <br>
                    Teach students a variety of cross-cutting topics centering on the practical application of statistical methods and machine learning to fields such as finance, digital marketing, & operations management
                    <br>
                    <br>
                    Coordinate and oversee ~20 graduate teaching assistants in a variety of areas such as content creation, course improvement, student interaction, and assignment/exam development & grading
                    <br>
                    <br>
                </p>
            </div>
        </div>
        <div class="timeline-seperator"></div>
        <div class="timeline-entry"> 
            <div class="timeline-lead">
                <h3>Graduate TA</h3>
                <p>May 2020 - December 2021</p>
            </div>
            <div class="timeline-school-icon">
                <a target="_blank" rel="noopener noreferrer" href='https://www.gatech.edu/' ><img src="images/Resume_Images/gt_small.png" style="width: 50px;height: auto;"></a>
            </div>
            <div class="timeline-content">
                <h3>Georgia Institute of Technology <span class="location-text"> Atlanta, GA</span></h3>
                <p>Serve as a TA for the masters level and micromasters level chorts of Data Analytics in Business
                    <br>
                    <br>
                    Responsible for creating a complete refresh of the course unit on finance factor models including both new slides, examples, lecture materials, and code.
                    <br>
                    <br>
                    Tutor students in a variety of the course’s cross-cutting topics in applying statistical methods and machine learning to the fields of finance, digital marketing, and operations management.
                    <br>
                    <br>
                    Led all other TA’s in response time, efficiency, and quality by addressing 944 individual student questions over the 10-week summer semester and over 700 in the most recent spring semester.
                </p>
            </div>
        </div>
        <div class="timeline-seperator"></div>
        <div class="timeline-entry"> 
            <div class="timeline-lead">
                <h3>Equity Research Analyst</h3>
                <p>August 2019 - August 2020</p>
            </div>
            <div class="timeline-school-icon">
                <a target="_blank" rel="noopener noreferrer" href='https://www.integritasim.com/'><img  src="images/Resume_Images/integritas_logo.png" style="width: 60px;height: 30px;"></a>
            </div>
            <div class="timeline-content">
                <h3>Integritas Investment Management <span class="location-text"> Alpharetta, GA</span></h3>
                <p>Initiated coverage of 13 companies operating primarily within the oil & gas industry
                    <br>
                    <br>
                    Developed statistical models to better forecast shale and LNG production yields in North American basins
                    <br>
                    <br>
                    Consulted with Wells Fargo Securities & Valens Research analysts on equity research findings and analysis
                    <br>
                    <br>
                    Identified & conducted extensive financial and quantitative analysis of small to mid-cap value equities
                    <br>
                    <br>
                    Analyzed and generated periodic fund allocation, attribution, and performance reports
                </p>
            </div>
        </div>
        <div class="timeline-seperator"></div>
        <div class="timeline-entry"> 
            <div class="timeline-lead">
                <h3>Private Equity Aquisitions Analyst</h3>
                <p>May 2018 - August 2018</p>
            </div>
            <div class="timeline-school-icon">
                <a target="_blank" rel="noopener noreferrer" href='https://www.industrypro.com/'><img  src="images/Resume_Images/industrypro_logo.png" style="width: 60px;height: 25px;"></a>
            </div>
            <div class="timeline-content">
                <h3>IndustryPro Advisors <span class="location-text"> Woodstock, GA</span></h3>
                <p>Sourced 478 potential acquisitions on behalf of a variety of private equity clients over the period
                    <br>
                    <br>
                    Provided industry coverage of oil & gas, medical devices & services, and manufacturing
                    <br>
                    <br>
                    Worked with analyst teams on creating DCF/LBO models and presented analysis to managing directors
                </p>
            </div>
        </div>
    </div>
</div>
`
