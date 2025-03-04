package com.example.workflow.service;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.List;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.example.workflow.repository.NotifyDayRepository;
import com.example.workflow.repository.NotifyTargetUserRepository;
import com.example.workflow.repository.NotifyTimeRepository;
import com.example.workflow.model.NotifyDay;
import com.example.workflow.model.NotifyTargetUser;
import com.example.workflow.model.NotifyTime;
import com.example.workflow.model.Role;

@Service
public class NotifyService {
    private final NotifyDayRepository dayRepository;
    private final NotifyTimeRepository timeRepository;
    private final NotifyTargetUserRepository targetUserRepository;
    private final LineMessageService lineMessageService;
    private final UserHospitalService userHospitalService;

    public NotifyService(NotifyDayRepository dayRepository, NotifyTimeRepository timeRepository, 
                         NotifyTargetUserRepository targetUserRepository, LineMessageService lineMessageService, UserHospitalService userHospitalService) {
        this.dayRepository = dayRepository;
        this.timeRepository = timeRepository;
        this.targetUserRepository = targetUserRepository;
        this.lineMessageService = lineMessageService;
        this.userHospitalService = userHospitalService;
    }

    @Scheduled(fixedRate = 60000) // Runs every minute 60k = 1 min
    public void checkAndSendMessages() {
        LocalDateTime now = LocalDateTime.now(ZoneId.of("Asia/Bangkok"));
        String today = now.getDayOfWeek().toString().toLowerCase(); // e.g., "monday"
        LocalTime currentTime = now.toLocalTime().truncatedTo(ChronoUnit.MINUTES);

        
        // Check if today is active
        NotifyDay day = dayRepository.findByNameAndActiveIsTrue(today);
        if (day == null) 
        {
            System.out.println("Today is not active day");
            return; // Skip if today is not active
        }

        // Check if the current time matches a scheduled time
        boolean matchtime = false;
        List<NotifyTime> time = timeRepository.findAll();
        if (time.isEmpty()) 
        {
            System.out.println("No time set");
            return; 
        }
        for (NotifyTime t : time) {
            if (t.getTime().truncatedTo(ChronoUnit.MINUTES).equals(currentTime)) {
                matchtime = true;
                break; // Found a match
            }
        }
        if (matchtime == false) 
        {
            System.out.println("No active time found");
            return; // Skip if no active time
        }
        
        
        
        // check target users
        List<NotifyTargetUser> users = targetUserRepository.findAll();
        if (users.isEmpty()) {
            System.out.println("No notify target users found");
            return;
        }

        

        //count remaining approver / director task
        int taskCountApprover = 0;
        int taskCountDirector = 0;
        String apiUrl = "http://localhost:8081/engine-rest/task" ;
        try {
                java.net.URL url = new java.net.URL(apiUrl);
                java.net.HttpURLConnection conn = (java.net.HttpURLConnection) url.openConnection();
                conn.setRequestMethod("GET");
                conn.setRequestProperty("Accept", "application/json");

                if (conn.getResponseCode() != 200) {
                    throw new RuntimeException("Failed : HTTP error code : " + conn.getResponseCode());
                }

                java.io.BufferedReader br = new java.io.BufferedReader(new java.io.InputStreamReader((conn.getInputStream())));
                StringBuilder sb = new StringBuilder();
                String output;
                while ((output = br.readLine()) != null) {
                    sb.append(output);
                }

                conn.disconnect();

                // Process the response
                String response = sb.toString();
                // response is a JSON array of tasks
                org.json.JSONArray tasks = new org.json.JSONArray(response);
                // Count using name field 
                // "name": "Get Input Form Approver"
                // "name": "Get Input Form Director"
                for (int i = 0; i < tasks.length(); i++) {
                    org.json.JSONObject task = tasks.getJSONObject(i);
                    String taskName = task.getString("name");
                    if (taskName.equals("Get Input Form Approver")) {
                        taskCountApprover++;
                    } else if (taskName.equals("Get Input Form Director")) {
                        taskCountDirector++;
                    }
                }

        } catch (Exception e) {
                e.printStackTrace();
        }

        //loop all TargetUser
        for (NotifyTargetUser user : users) {

            //get role
            Role enumRole = user.getTargetUser().getRole();
            int numTask = 0;
            if(enumRole.equals(Role.APPROVER))
            {
                numTask = taskCountApprover;
            }
            else if(enumRole.equals(Role.DIRECTOR))
            {
                numTask = taskCountDirector;
            }else{
                System.out.println("UserHospital : " + user.getTargetUser().getFirstName() + " have wrong role!!!!!");
                return;
            }

           
            //backend log
            System.out.println(
            "Hello : " 
            + user.getTargetUser().getFirstName() 
            + " " 
            + user.getTargetUser().getLastName() 
            + " your role is " 
            + enumRole 
            + " you have " 
            + numTask 
            + " task to do");

            //ส่งข้อความ + Link web app
            // T id line "U9248dc5b4d58a88e3810dd31a8ecfd3d"
            lineMessageService.pushMessage(user.getTargetUser().getLineId(), 
            "Hello : " 
            + user.getTargetUser().getFirstName() 
            + " " 
            + user.getTargetUser().getLastName()
            + " your role is " 
            + enumRole 
            + " you have " 
            + numTask 
            + " task to do"
            + " follow this links to web app https://www.google.com/ ");
        }

                     
    }
}
