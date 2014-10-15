import json
import sys
import string
import random
import re

from argparse import ArgumentParser

def read_conf():
	return json.load(open('test.json'))

def sites_by_category(conf, category):
	return [site for site in conf["sites"] if site["category"] == category]

def look_for_available_keycode(conf, name, category):
	letters = set(name)
	for site in sites_by_category(conf, category):
		letters = letters.difference(site["keycode"])
	return list(letters)

def random_keycode(conf, category):
	return random.sample(set(string.ascii_lowercase).difference(set("".join(site["keycode"] for site in sites_by_category(conf, category)))), 1)[0]

def add_category(conf, category):
	new_obj = dict()
	try:
		keycode = look_for_available_keycode(conf, args.name, args.category)[0]
		shown_name = args.name.replace(keycode, "[%s]"%keycode, 1) #replace only the first one
	except:
		print "all keys are taken, giving random keycode..."
		keycode = random_keycode(doc, args.category)
		shown_name = args.name + " [%s]"%keycode
	new_obj["keycode"] = keycode
	new_obj["shown_name"] = shown_name
	new_obj["name"] = category
	conf["category"].append(new_obj)


def add_site(parameters):
	parser = ArgumentParser()
	parser.add_argument('link', metavar='link',
		               type=str,
		               help="the link to the site you want to add")
	parser.add_argument('name', metavar="name", type=str,
		               help="the name you want to see on the screen")
	parser.add_argument('category', type=str,
		               help="the category the site belongs to")
	args = parser.parse_args(parameters)

	doc = read_conf()
	new_obj = dict()
	try:
		keycode = look_for_available_keycode(doc, args.name, args.category)[0]
		shown_name = args.name.replace(keycode, "[%s]"%keycode)
	except:
		print "all keys are taken, giving random keycode..."
		keycode = random_keycode(doc, args.category)
		shown_name = args.name + " [%s]"%keycode
	new_obj["keycode"] = keycode
	new_obj["shown_name"] = shown_name
	new_obj["category"] = args.category
	new_obj["link_properties"] = {"link": args.link}
	doc["sites"].append(new_obj)
	if not sites_by_category(doc, args.category):
		add_category(doc, args.category)
	json.dump(doc, open("test.json", "w"))

def remove_site(parameters):
	parser = ArgumentParser()
	parser.add_argument('name', metavar="name", type=str,
		               help="the name you want to remove (with no [k]eycodes)")
	args = parser.parse_args(parameters)
	doc = read_conf()
	size_before_deletion = len(doc["sites"])
	doc["sites"] = filter(lambda site: site["shown_name"].replace("[", "").replace("]", "") != args.name, doc["sites"])
	if(size_before_deletion == len(doc["sites"])): #no removal
		doc["sites"] = filter(lambda site: re.sub(" \[[a-z]\]$", "", site["shown_name"]) != args.name, doc["sites"])
	#don't add the automatic category removal, for now
	json.dump(doc, open("test.json", "w"))

functions = {
	"site add": add_site,
	"site remove": remove_site
}

if __name__ == '__main__':
	try:
		functions[" ".join(sys.argv[1:3])](sys.argv[3:])

	except KeyError:
		print "it should be:", "\n* ".join(functions.keys())