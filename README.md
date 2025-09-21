<h1>copy keypair form local to ec2 instance using secure copy (scp) command </h1><br>
step 1: (on local)<br>
chmod 400 Ansible-master-keypair.pem<br>
step 2: (on AMI server)<br>
chmod 700 keys/<br>
step 3: (on AMI server)<br>
chown ubuntu:ubuntu /home/ubuntu/keys<br>
step 4: (on local)<br>
sudo scp -i "Ansible-master-keypair.pem" Ansible-master-keypair.pem (key pair name) ubuntu@ec2-13-233-166-127.ap-south-1.compute.amazonaws.com:/home/ubuntu/keys(path to derectory)<br><br>

<h1>INSTALL ANSIBLE</h1>
1: sudo apt-add-repository ppa:ansible/ansible
2: sudo apt update
3: sudo apt install ansible
