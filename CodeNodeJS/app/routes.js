module.exports = function(app,passport){
    var Course = require('../app/models/course');
    var User = require('../app/models/user');
    var Student = require('../app/models/student');
    var Faculty = require('../app/models/faculty');
    var Subject = require('../app/models/subject');
    var Professor = require('../app/models/professor');
    var sessionArr = require('../config/auth.js');

    var myCourseList=[];
    var courseList=[];

    app.get('/',function(req,res){
        res.render('index.ejs');
    });

    app.get('/login',function(req,res){
        //res.render('login.ejs',{message:req.flash('loginMessage')});
        res.json({ message: req.flash('loginMessage')});
    });

    app.get('/signup',function(req,res){
        res.render('signup.ejs',{ message: req.flash('signupMessage')});
    });

    //after login redirect to profile page with student info
    app.get('/profile',isLoggedIn,function(req,res){
        var student=req.user;
        res.json(student);
    });

    app.get('/logout',isLoggedIn,function(req,res){
        for(var i in sessionArr){
            if(sessionArr[i] == req.user.studentID) {
                sessionArr.splice(i,1);
            }
        }
        req.logout();
        res.json({message:"Thành công"});
    });

    //additional function to signup student
    app.post('/signup',passport.authenticate('local-signup',{
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash: true
    }));

    app.post('/login',passport.authenticate('local-login',{failureRedirect:'/login',failureFlash: true}),function(req,res){
        var user=req.user;
        Student.findOne({studentID:user.username},function(err,student){
            if(err)
                res.send(err);
            else{
                var facultyName=student.faculty;
                var semester=student.semester;
                getCourses(facultyName,semester);
                getMyCourses(student);
            }
             res.json({"id":user.username,"name":student.studentName,"message":req.flash('loginMessage')});
        });
    });

    //Get courses
    function getCourses(facultyName,semester){
        var subjectListOfSemester=[];
        var courseIdListOfSubject=[];
        courseList=[];
        Faculty.findOne({facultyName:facultyName},function(err,faculty){
            if(err)
                console.log(err);
            else {
                var subjectListOfFaculty = faculty.subjectList;
                for(var i=0; i < subjectListOfFaculty.length; i++){
                    if(subjectListOfFaculty[i].semester==semester){
                        subjectListOfSemester=subjectListOfFaculty[i].subjects;
                    }
                }
                for(var i=0; i < subjectListOfSemester.length; i++){
                    Subject.findOne({subjectID:subjectListOfSemester[i]},function(err,subject){
                        if(err)
                            console.log(err);
                        else {
                            courseIdListOfSubject=subject.courseList;
                            for(var i=0; i < courseIdListOfSubject.length; i++){
                                Course.findOne({courseID:courseIdListOfSubject[i]},function(err,course){
                                    if(err)
                                        console.log(err);
                                    if(course){
                                        courseList.push(course);
                                    }
                                });
                            }
                        }
                    });
                }
            }
        });
    }

    //Get student courses
    function getMyCourses(student){
         myCourseList=[];
         var myCourses =student.myCourses;
        for(var i=0; i < myCourses.length; i++){
            Course.findOne({courseID:myCourses[i]},function(err,course){
                if(err)
                    console.log(err);
                else {
                    myCourseList.push(course);
                }
            });
        }
    }

    //list all courses
    app.get('/courses',isLoggedIn,function(req,res){
         res.json(courseList);
    });

    app.post('/courses',isLoggedIn,function(req,res){
        var student=req.user;
        var id = student.studentID;
        var courseID=req.body.courseID;
        if(isRegistered(student.myCourses,courseID)==true){
            res.json({"message":"Bạn đã đăng ký khóa học này"});
        }
        else {
            Course.findOne({courseID:courseID},function(err,course){
                if(err)
                    res.json({"message":"Lỗi"});
                if(!course)
                    res.json({"message":"Không tìm thấy khóa học"});
                if(course){
                    if(isFull(course.occupied,course.available)){
                        res.json({"message":"Khóa học này đã đầy"});
                    }else{
                        course.occupied=course.occupied+1;
                        course.save(function(err){
                            if(err)
                                res.json({"message":"Lỗi"});
                            else{
                                addToMyCourses(student,course,res);
                            }
                        });
                    }
                }
            });

        }
    });

    function isFull(occupied,available){
        if(occupied >= available)
            return true;
        else
            return false;
    }

    function isRegistered(myCourses,courseID){
        for(var i in myCourses){
            if(courseID==myCourses[i])
                return true;
        }
        return false;
    }

    function addToMyCourses(student,course,res){
        var id = student.studentID;
        var courseID = course.courseID;
        Student.update({studentID:id},{ $push: { myCourses:courseID} },function(err){
            if(err)
                res.json({"message":"Lỗi"});
            else{
                //getMyCourses(student);
                myCourseList.push(course);
                for(var i in courseList) {
                    if(courseList[i].courseID ==courseID) {
                    courseList.splice(i, 1);
                    }
                }
                res.json({"message":"Thành công","myCourses":myCourseList});
            }
        });

    }
    //list all registered courses of student
    app.get('/mycourses',isLoggedIn,function(req,res){
        res.json(myCourseList);
    });

    //delete registered course and redirect to mycourses page
    app.post('/mycourses',isLoggedIn,function(req,res){
        var student=req.user;
        var id = student.studentID;
        var courseID=req.body.courseID;
        if(isRegistered(student.myCourses,courseID)==true){
            Course.findOne({courseID:courseID},function(err,course){
                if(err)
                    res.json({"message":"Lỗi"});
                if(!course)
                    res.json({"message":"Không tìm thấy khóa học"});
                if(course){
                    if(isEmpty(course.occupied))
                        res.json({"message":"Khóa học này đã trống"});
                    else {
                        course.occupied=course.occupied-1;
                        course.save(function(err){
                            if(err)
                                res.json({"message":"Lỗi"});
                            else {
                                removeFromMyCourses(student,course,res);
                            }
                        });
                    }
                }
            });
        }
        else {
            res.json({"message":"Bạn chưa đăng ký khóa học này"});
        }
    });

    function removeFromMyCourses(student,course,res){
        var id = student.studentID;
        var courseID=course.courseID;
        Student.update({studentID: id},{ $pull: { myCourses: {$in: [courseID] } } },function(err){
            if(err)
                res.json({"message":"Thất bại"});
            else {
                //getMyCourses(student);
                courseList.push(course);
                for(var i in myCourseList) {
                    if(myCourseList[i].courseID ==courseID) {
                    myCourseList.splice(i, 1);
                    }
                }
                res.json({"message":"Thành công","myCourses":myCourseList});
            }
        });
    }

    function isEmpty(occupied){
        if(occupied <=0)
            return true;
        else
            return false;
    }

}

//route middleware to make sure a user is logged in
function isLoggedIn(req,res,next){
    if(req.isAuthenticated())
        return next();

    res.redirect('/');
}
