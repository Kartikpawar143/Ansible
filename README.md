<h1>copy keypair form local to ec2 instance using secure copy (scp) command </h1><br>
step 1: (on local)<br>
chmod 400 Ansible-master-keypair.pem<br>
step 2: (on AMI server)<br>
chmod 700 keys/<br>
step 3: (on AMI server)<br>
chown ubuntu:ubuntu /home/ubuntu/keys<br>
step 4: (on local)<br>
sudo scp -i "Ansible-master-keypair.pem" Ansible-master-keypair.pem (key pair name) ubuntu@ec2-13-233-166-127.ap-south-1.compute.amazonaws.com:/home/ubuntu/keys(path to derectory)<br><br>

<h1>INSTALL ANSIBLE</h1> <br>
1: sudo apt-add-repository ppa:ansible/ansible <br>
2: sudo apt update<br>
3: sudo apt install ansible<br>

<h1>Set up Host file (etc/ansible/)</h1><br>
[servers] <br>
Slave-Server ansible_host=15.206.124.252 <br>

[all:vars] <br>
ansible_user=ubuntu <br>
ansible_python_interpreter=/usr/bin/python3 <br>
ansible_ssh_private_key_file=/home/ubuntu/keys/Ansible-master-keypair.pem <br>
